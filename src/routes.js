import React from 'react';
import {Router, IndexRoute, Route} from 'react-router';

import App from './App';
import BlogHome from './components/BlogHome'
import BlogPost from './components/BlogPost'

const routes = (props) => {
  <Router {...props}>
    <Route path='/' component={App}>
      <IndexRoute component={BlogHome}/>
      <Route path='/p/:page' component={BlogHome}/>
      <Route path='/post/:slug' component={BlogPost}/>
    </Route>
  </Router>
}