import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMessages, markAllmsg } from '../Action/Topics';
import Messages from '../Component/Messages';

class MessagesContainer extends Component {

  componentWillMount() {
    // 获取用户消息
    const accessToken = {
      accesstoken: 'f5abd299-b9a8-4eff-9836-b9a9a3905e9e',
    };
    this.props.getMessages(accessToken);

    // 标记全部为已读
    this.props.markAllmsg(accessToken);
  }
  render() {
    return (
      <Messages {...this.props} />
    );
  }
}

MessagesContainer.propTypes = {
  getMessages: PropTypes.func.isRequired,
  markAllmsg: PropTypes.func.isRequired,
};

export default connect(state => (
  { messages: state.messages }), { getMessages, markAllmsg },
)(MessagesContainer); // 连接redux
