import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, ActivityIndicator, WingBlank } from 'antd-mobile';

import NavBar from '../Common/NavBar';
import CommentList from './CommentList';
import CommentBox from './CommentBox';

import style from './index.less';
import box from './markdown.less'; // markdown css

moment.locale('zh-cn');

class TopicMain extends React.Component {
  componentDidMount() {

  }
  render() {
    const createMarkup = content => ({
      __html: content,
    });
    const { collect, replies, ups } = this.props;
    const { topic } = this.props.topic;
    if (!topic.id) {
      return (<div className={style.Loading}>
        <ActivityIndicator size="large" />
        <span style={{ marginTop: 8 }}>Loading...</span>
      </div>);
    }
    return (
      <div className="App">
        <NavBar
          {...this.props}
          leftIcon="back"
          title="详情"
        />
        <div className={style.content}>
          <Card full>
            <Card.Header
              title={<div>
                <p className={style.name}>
                  {topic.author.loginname} &nbsp;
                  <span className="data">{moment(topic.last_reply_at, 'YYYYMMDD').fromNow()}</span>
                </p>
                <p className={style.yuedu}>阅读: {topic.visit_count} 回复:{topic.reply_count}</p>
              </div>}
              thumb={topic.author.avatar_url}
              thumbStyle={{ width: 120 }}
              extra={
                <div className={style.icon} onClick={() => collect(topic.id, topic.is_collect)}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={topic.is_collect ? '#icon-shoucang1' : '#icon-shoucang'} />
                  </svg>
                </div>
            }
            />
            <Card.Body>
              <div
                className={box.markdown}
                dangerouslySetInnerHTML={createMarkup(topic.content)}
              />
            </Card.Body>
          </Card>
          <CommentList
            topic={topic}
            repliesList={topic.replies}
            replies={replies}
            ups={ups}
          />
        </div>
        <div className={style.commentInput}>
          <WingBlank size="lg">
            <CommentBox
              topicId={topic.id}
              repliesId={this.props.repliesId}
              cancelReplie={this.props.cancelReplie}
              submitComment={this.props.submitComment}
            />
          </WingBlank>
        </div>
      </div>
    );
  }
}
TopicMain.propTypes = {
  topic: PropTypes.object.isRequired,
  repliesId: PropTypes.object.isRequired,
  collect: PropTypes.func.isRequired,
  replies: PropTypes.func.isRequired,
  ups: PropTypes.func.isRequired,
  cancelReplie: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,

};


export default TopicMain;
