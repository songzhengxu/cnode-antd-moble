import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Toast } from 'antd-mobile';
import { getTopic, clearTopic } from '../Action';
import Topic from '../Component/Topic';

import Api from '../utils/Api';

const alert = Modal.alert;

class TopicContainer extends Component {

  componentWillMount() {
    // 获取主题详情
    const { params } = this.props.match;
    const { accesstoken } = this.props.login;

    this.props.getTopic({
      id: params.key,
      accesstoken,
    });
  }
  // 组件卸载时
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
  collect=(topicId, isCollect) => {
    const { accesstoken } = this.props.login;
    if (!accesstoken) {
      this.showelert();
    } else {
      // 判断是收藏操作还是取消搜藏得操作
      let response;
      if (isCollect) {
        response = Api.postUnCollect({
          accesstoken,
          topic_id: topicId,
        });
      } else {
        response = Api.postCollect({
          accesstoken,
          topic_id: topicId,
        });
      }
      response.then(async (v) => {
        if (v.data.success) {
          await Toast.success('操作成功', 1);
          this.props.getTopic({
            id: topicId,
            accesstoken,
          });
        }
      }).catch(e => console.log(e));
    }
  }
  replies = () => {
    alert('replies');
  }
  ups = (topicId, replieId) => {
    const { accesstoken } = this.props.login;
    if (!accesstoken) {
      this.showelert();
    } else {
      // 点赞
      const response = Api.postUps({
        accesstoken,
        id: replieId,
      });
      response.then(async (v) => {
        if (v.data.success) {
          const msg = v.data.action === 'up' ? '点赞' : '取消点赞';
          await Toast.success(`${msg}成功`, 1);
          // 刷新数据
          this.props.getTopic({
            id: topicId,
            accesstoken,
          });
        }
      }).catch(e => console.log(e));
    }
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
  clearTopic: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(state => (
  { topic: state.topic, login: state.login }), { getTopic, clearTopic },
)(TopicContainer); // 连接redux
