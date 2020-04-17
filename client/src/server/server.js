/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Layout from '../frontend/components/Layout';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers/index';
import initialState from '../frontend/initialState';
import getManifest from './getManifest';
import config from './config';

const app = express();

if (config.server.env === 'development') {
  console.log('Load development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const webpackServerConfig = {
    port: config.server.port,
    hot: true,
  };
  app.use(webpackDevMiddleware(compiler, webpackServerConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) {
      req.hashManifest = getManifest();
    }
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  return (`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" type="text/css" href="${mainStyles}"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <title>FrcGustavo</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)/* .replace(/</g, '\\u003c') */}
        </script>
        <script src="${mainBuild}"></script>
    </body>
    </html>
  `);
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>
          { renderRoutes(serverRoutes) }
        </Layout>
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.get('*', renderApp);

app.listen(config.server.port, () => {
  console.log(`Server is listening on http://localhost:${config.server.port}`);
});
