import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/';
import ReduxPromise from 'redux-promise';
import promiseMiddleware from 'redux-promise-middleware';

import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import './css/index.css';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

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
