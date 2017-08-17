import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import { postLogin } from '../Action';
import Login from '../Component/Login';

class LoginContainer extends Component {
  componentWillReceiveProps() {

  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    console.log(from);
    const { loginname } = this.props.login;
    if (loginname) {
      return (
        <Redirect to={from} />
      );
    }
    return (
      <Login {...this.props} user={this.props.login} />
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(state => (
  { login: state.login }), { postLogin },
)(LoginContainer); // 连接redux
