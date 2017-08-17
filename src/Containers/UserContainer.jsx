import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser, loginOut } from '../Action';
import User from '../Component/User';

class UserContainer extends Component {

  componentDidMount() {
    // 获取用户详情
    const { history, login } = this.props;
    const { params } = this.props.match;
    if (params.id) {
      this.props.getUser(params.id);
    } else if (!params.id && login.loginname) {
      history.push(`/user/${login.loginname}`);
      this.props.getUser(login.loginname);
    } else {
      history.push('/login');
    }
  }
  render() {
    return (
      <User {...this.props} />
    );
  }
}

UserContainer.propTypes = {
  getUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
};

export default connect(state => (
  { user: state.user, login: state.login }), { getUser, loginOut },
)(UserContainer); // 连接redux
