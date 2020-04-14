import React from 'react';
import { Link } from 'react-router-dom';

const post = 'https://firebasestorage.googleapis.com/v0/b/frcgustavo-849f3.appspot.com/o/post.png?alt=media&token=01feb409-2585-4ffd-a9d1-11d84524f96d';

const Blog = () => (
  <div className="blog">
    <div className="card-principle">
      <div className="container">
        <img src={post} alt="" />
        <div className="card-info">
          <h1>Titulo del post</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut a fugiat soluta consequatur nisi sunt.</p>
          <Link className="btn btn-primary" to="/my-first-blog">Leer más</Link>
        </div>
      </div>
    </div>
    <section className="gird-cards">
      <div className="container">
        <article className="card-post">
          <img src={post} alt="" />
          <div className="card-info">
            <h1>Titulo del post</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut a fugiat soluta consequatur nisi sunt.</p>
            <Link className="btn btn-primary" to="/my-first-blog">Leer más</Link>
          </div>
        </article>
      </div>
    </section>
  </div>
);

export default Blog;
