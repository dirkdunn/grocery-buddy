import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import './index.css';

ReactDOM.render(
  <Router>
    <div className="main">
      <Route exact path="/" component={Login} />
      <Route path="/grocerylist" component={App} />
    </div>
  </Router>,
  document.getElementById('root')
);
