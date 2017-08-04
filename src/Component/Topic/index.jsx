import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Button } from 'antd-mobile';

import NavBar from '../Common/NavBar';
import style from './index.css';

import box from './markdown.css'; // markdown css

moment.locale('zh-cn');

class TopicMain extends React.Component {
  componentDidMount() {

  }
  render() {
    const createMarkup = content => ({
      __html: content,
    });
    const { topic } = this.props.topic;
    if (!topic.id) {
      return (<div>加载中</div>);
    }
    return (
      <div className="App">
        <NavBar />
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
              extra={
                <Button className={style.btn} activeStyle="false" size="small" type="primary">关注</Button>
            }
            />
            <Card.Body>
              <div
                className={box.markdown}
                dangerouslySetInnerHTML={createMarkup(topic.content)}
              />
            </Card.Body>
          </Card>
          <div className={style.pinlun}>
            <div className={style.pinlunHead}> 共<span className={style.pl_num}>{topic.replies.length}</span>条评论 </div>
            {
              topic.replies.map((replie, index) => (
                <Card key={replie.id}>
                  <Card.Header
                    title={
                      <p className={style.name}>
                        {replie.author.loginname} &nbsp;
                        <span className="data">{moment(replie.create_at, 'YYYYMMDD').fromNow()}</span>
                      </p>}
                    thumb={replie.author.avatar_url}
                    extra={<span>#{index}</span>}
                  />
                  <Card.Body>
                    <div
                      className={box.markdown}
                      dangerouslySetInnerHTML={createMarkup(replie.content)}
                    />
                  </Card.Body>
                  <Card.Footer extra={<div> 点赞 回复 </div>} />
                </Card>
              ))
            }

          </div>
        </div>
      </div>
    );
  }
}
TopicMain.propTypes = {
  topic: PropTypes.object.isRequired,
};


export default TopicMain;
