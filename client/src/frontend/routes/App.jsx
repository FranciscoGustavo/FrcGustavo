import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Blog from '../pages/Blog';
import Home from '../pages/Home';

import '../assets/styles/main.scss';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
