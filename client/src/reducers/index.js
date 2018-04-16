import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import messages from './messages.js';
import user from './user.js';
 
export default combineReducers({
  messages: messages,
  user: user,
  router: routerReducer
})
