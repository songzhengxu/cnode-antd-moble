import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMessages, markAllmsg } from '../Action';
import Messages from '../Component/Messages';

class MessagesContainer extends Component {

  componentWillMount() {
    // 获取用户消息

    const { accessToken } = this.props.login;
    this.props.getMessages(accessToken);

    // 标记全部为已读
    // this.props.markAllmsg(accessToken);
  }
  render() {
    return (
      <Messages {...this.props} />
    );
  }
}

MessagesContainer.propTypes = {
  getMessages: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  // markAllmsg: PropTypes.func.isRequired,
};

export default connect(state => (
  { messages: state.messages, login: state.login }), { getMessages, markAllmsg },
)(MessagesContainer); // 连接redux
