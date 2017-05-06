import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/';
import promiseMiddleware from 'redux-promise-middleware';

import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import './css/index.css';

window.devlog = function(){
  if(/localhost/.test(location.origin)){
    console.log.apply(this,[].slice.call(arguments))
  }
}

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware(),thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div className="main">
        <Route exact path="/" component={Login} />
        <Route path="/grocerylist" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
