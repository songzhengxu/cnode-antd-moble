import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import { postLogin } from '../Action';
import Login from '../Component/Login';

class LoginContainer extends Component {
  componentDidMount() {
    const { history } = this.props;
    const { loginname } = this.props.login;
    if (loginname) {
      history.push(`/user/${loginname}`);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const { fail, error_msg, loginname } = nextProps.login;
    if (fail) {
      Toast.fail(error_msg);
    } else if (loginname) {
      Toast.success(`欢迎${loginname}`);
      history.push(`/user/${loginname}`);
    }
  }
  render() {
    return (
      <Login {...this.props} user={this.props.login} />
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => (
  { login: state.login }), { postLogin },
)(LoginContainer); // 连接redux
