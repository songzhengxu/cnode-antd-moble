import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTopics } from '../Action/Topics';
import Topics from '../Component/Topics';

class TopicsContainer extends Component {

  componentWillMount() {
    this.props.getTopics();
  }
  render() {
    return (
      <Topics {...this.props} />
    );
  }
}

TopicsContainer.propTypes = {
  getTopics: PropTypes.func.isRequired,
};

export default connect(state => (
  { topics: state.topics }), { getTopics },
)(TopicsContainer); // 连接redux
