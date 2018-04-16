import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // makes redux store available to connect() calls in component hierarchy
import { createStore, applyMiddleware } from 'redux';
import {
  ConnectedRouter, // use store from provider automatically
  routerMiddleware, // capture dispatched actions and redirect to provided history instance
  push // push pushes new location to history
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router'; // react-router is core functions, react-router-dom gives dom elements that interact with window.history
import thunk from 'redux-thunk'; // create action-creators that return function

import reducers from './reducers/index.js';
import style from './scss/index.scss'; // import style for webpack

import App from './containers/App.js';
import Login from './containers/Login.js';
import SignUp from './containers/SignUp.js';

const history = createHistory(); // create browserHistory that can get history length, location, and action
const middleware = routerMiddleware(history); // Build the middleware for intercepting and dispatching navigation actions

// args --> reducing function that return next state tree,
// preloadedState is initial state
// enhancers which is the thir party capabilities such as middleware
const store = createStore(reducers, applyMiddleware(middleware, thunk))
 
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
