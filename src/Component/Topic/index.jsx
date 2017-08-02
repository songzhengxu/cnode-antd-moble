import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd-mobile';
import 'github-markdown-css'; // markdown css

import NavBar from '../Common/NavBar';
import style from './index.css';


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
                <p>{topic.author.loginname}</p>
                <p>阅读: {topic.visit_count} 回复:{topic.reply_count}</p>
              </div>}
              thumb={topic.author.avatar_url}
              extra={<span>关注</span>}
            />
            <Card.Body>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={createMarkup(topic.content)}
              />
            </Card.Body>
            <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
          </Card>
        </div>
      </div>
    );
  }
}
TopicMain.propTypes = {
  topic: PropTypes.object.isRequired,
};


export default TopicMain;
