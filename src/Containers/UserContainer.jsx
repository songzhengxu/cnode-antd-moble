import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser } from '../Action/Topics';
import User from '../Component/User';

class UserContainer extends Component {

  componentWillMount() {
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
};

export default connect(state => (
  { user: state.user }), { getUser },
)(UserContainer); // 连接redux
