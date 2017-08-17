import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import { getTopic, clearTopic, postCollect } from '../Action';
import Topic from '../Component/Topic';

const alert = Modal.alert;

class TopicContainer extends Component {

  componentWillMount() {
    // 获取主题详情
    const { params } = this.props.match;
    this.props.getTopic(params.key);
  }
  componentWillUnmount() {
    this.props.clearTopic();
  }
  showelert =() => {
    const { history } = this.props;
    alert('登录', '需要登录后操作', [
          { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          history.push('/login', { from: this.props.location });
        },
      },
    ]);
  }
  collect=(topicId) => {
    const { accesstoken } = this.props.login;
    if (!accesstoken) {
      this.showelert();
    } else {
      this.props.postCollect({
        accesstoken,
        topic_id: topicId,
      });
    }
  }
  replies = () => {
    alert('replies');
  }
  ups = () => {
    alert('ups');
  }
  render() {
    return (
      <Topic
        collect={this.collect}
        replies={this.replies}
        ups={this.ups}
        {...this.props}
      />
    );
  }
}

TopicContainer.propTypes = {
  getTopic: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  postCollect: PropTypes.func.isRequired,
  clearTopic: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(state => (
  { topic: state.topic, login: state.login }), { getTopic, clearTopic, postCollect },
)(TopicContainer); // 连接redux
