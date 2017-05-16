import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/';
import ReactDOM from 'react-dom';
import GroceryListApp from './containers/GroceryListApp';
import Login from './Login';
import Lists from './containers/Lists'
import './css/index.css';

window.devlog = function(){
  if(/localhost/.test(location.origin)){
    console.log.apply(this,[].slice.call(arguments))
  }
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div className="main">
        <Route exact path="/" component={Login} />
        <Route path="/lists" component={Lists} />
        <Route path="/grocerylist" component={GroceryListApp} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
