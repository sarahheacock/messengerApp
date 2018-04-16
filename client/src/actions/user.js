import * as userActions from '../actionTypes/user.js';
import axios from 'axios';

const urlOrigin = 'http://localhost:8888';

export const updateUser = (user) => {
  return {
    type: userActions.UPDATE_USER,
    user: user
  }
}

export const loginUser = (url, user) => {
  const postUrl = `${urlOrigin}${url}`;

  return (dispatch) => {
    axios.post(postUrl, user).then(res => {
      const arg = (!res.data || res.data.message) ?
        {
          message: res.data.message,
          token: ''
        }:
        {
          username: res.data.username,
          token: res.data.token,
          password: '',
          verifyPassword: ''
        };

      dispatch(updateUser(arg));
    })
  }
}
