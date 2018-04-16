import React from 'react';
import PropTypes from 'prop-types';

class UserForm extends React.Component {
  handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.props.updateUser({
      [name]: value
    })
  }

  render() {
    const { message, username, password, verifyPassword } = this.props.user;

    return (
      <div>
        <form>
          Username: <input type="text" name="username" onChange={this.handleFormChange} value={username} />
          Password: <input type="password" name="password" onChange={this.handleFormChange} value={password} />
          {(this.props.pathname === "/signup") ?
            <span>Verify Password: <input type="password" name="verifyPassword" onChange={this.handleFormChange} value={verifyPassword} /></span>:
            null
          }
        </form>
        <div>{message}</div>
      </div>
    )
  }
}

UserForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    verifyPassword: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,

  updateUser: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired
}

export default UserForm;
