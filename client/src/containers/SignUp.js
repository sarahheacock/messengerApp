import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { loginUser, updateUser } from '../actions/user.js';

import UserForm from '../components/UserForm.js';

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = dispatch => ({
  updateUser: userInfo => dispatch(updateUser(userInfo)),
  loginUser: userInfo => dispatch(loginUser(userInfo))
})

class SignUp extends React.Component {
  signup = (e) => {
    this.props.loginUser({
      username: this.props.user.username,
      password: this.props.user.password,
      verifyPassword: this.props.verifyPassword
    }, "/user/signup")
  }

  login = (e) => {
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <UserForm
          user={this.props.user}
          updateUser={this.props.updateUser}
          pathname={this.props.location.pathname}
        />
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.login}>Login</button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

SignUp.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    verifyPassword: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
}
