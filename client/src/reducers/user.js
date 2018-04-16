import * as userActions from '../actionTypes/user.js';

const storageUser = localStorage.getItem('user');
const userState = (storageUser) ?
  {
    ...JSON.parse(storageUser),
    password: '',
    verifyPassword: '',
    message: ''
  }:
  {
    username: '',
    password: '',
    verifyPassword: '',
    token: '',
    message: ''
  }

export default function user(state=userState, action) {
  switch(action.type) {
    case userActions.UPDATE_USER:
      return {
        ...state,
        ...action.user
      }

    default:
      return state
  }
}
