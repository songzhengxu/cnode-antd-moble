import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTopic } from '../Action/Topics';
import Topic from '../Component/Topic';

class TopicContainer extends Component {

  componentWillMount() {
    // 获取主题详情
    const { params } = this.props.match;
    this.props.getTopic(params.key);
  }
  render() {
    return (
      <Topic {...this.props} />
    );
  }
}

TopicContainer.propTypes = {
  getTopic: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(state => (
  { topic: state.topic }), { getTopic },
)(TopicContainer); // 连接redux
