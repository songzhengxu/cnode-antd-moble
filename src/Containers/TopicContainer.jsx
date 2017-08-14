import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTopic, clearTopic } from '../Action';
import Topic from '../Component/Topic';

class TopicContainer extends Component {

  componentWillMount() {
    // 获取主题详情
    const { params } = this.props.match;
    this.props.getTopic(params.key);
  }
  componentWillUnmount() {
    this.props.clearTopic();
  }
  render() {
    return (
      <Topic {...this.props} />
    );
  }
}

TopicContainer.propTypes = {
  getTopic: PropTypes.func.isRequired,
  clearTopic: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(state => (
  { topic: state.topic }), { getTopic, clearTopic },
)(TopicContainer); // 连接redux
