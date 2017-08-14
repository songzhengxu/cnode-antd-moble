import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser, loginOut } from '../Action';
import User from '../Component/User';

class UserContainer extends Component {

  componentDidMount() {
    // 获取用户详情
    const { params } = this.props.match;
    this.props.getUser(params.id);
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
  // history: PropTypes.object.isRequired,
  // login: PropTypes.object.isRequired,
};

export default connect(state => (
  { user: state.user, login: state.login }), { getUser, loginOut },
)(UserContainer); // 连接redux
