import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Toast } from 'antd-mobile';
import { getTopic, clearTopic } from '../Action';
import Topic from '../Component/Topic';

import Api from '../utils/Api';

const alert = Modal.alert;

class TopicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repliesId: {
        user: '',
        reply_id: '',
      },
    };
  }
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
  // 提示登录
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
  // 收藏
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
  // 回复评论
  replies = (replieId, name) => {
    this.setState({
      repliesId: {
        user: name,
        reply_id: replieId,
      },
    });
    window.scrollTo(0, document.body.scrollHeight);
  }
  // 取消回复评论
  cancelReplie=() => {
    this.setState({
      repliesId: {
        topicId: '',
        user: '',
        reply_id: '',
      },
    });
  }
  // 给评论点赞
  ups = (topicId, replieId, userName) => {
    const { accesstoken, loginname } = this.props.login;
    if (!accesstoken) {
      this.showelert();
      // 不能给自己的评论点赞
      // code...
    } else if (userName === loginname) {
      Toast.fail('不能给自己点赞', 1);
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
      }).catch((e) => {
        console.log(e);
      });
    }
  }
  // 提交评论
  submitComment=(topicId, content) => {
    const { accesstoken } = this.props.login;

    if (!accesstoken) {
      this.showelert();
    } else {
      const response = Api.postComment({
        accesstoken,
        content,
        id: topicId,
        reply_id: this.state.repliesId.reply_id,
      });
      response.then((v) => {
        if (v.data.success) {
          Toast.success('评论成功', 1);
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
        repliesId={this.state.repliesId}
        cancelReplie={this.cancelReplie}
        submitComment={this.submitComment}
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
