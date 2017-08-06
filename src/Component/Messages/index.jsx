import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd-mobile';
import moment from 'moment';
import { Link } from 'react-router-dom';


import NavBar from '../Common/NavBar';
import TabBar from '../Common/TabBar';

import style from './index.css';

moment.locale('zh-cn');

class Messages extends Component {
  returnContent = (type, topic) => {
    if (type === 'at') {
      return <div>在话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link>中 @了你</div>;
    }
    return <div className={style.title}>回复你了的话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link></div>;
  }
  render() {
    const { messages } = this.props;
    const { has_read_messages, hasnot_read_messages } = messages.messages;
    // eslint-disable-next-line
    if (!hasnot_read_messages) {
      return <div>没有消息</div>;
    }
    // eslint-disable-next-line
    const messagesDate = [...hasnot_read_messages, ...has_read_messages];
    return (
      <div>
        <NavBar
          leftIcon="left"
          title="消息"
        />
        <div className={style.content}>
          {
            messagesDate.map(data => (
              <Card key={data.id}>
                <Link to={`/user/${data.author.loginname}`}>
                  <Card.Header
                    title={data.author.loginname}
                    thumb={data.author.avatar_url}
                    thumbStyle={{ width: 120, borderRadius: '50%' }}
                    extra={<span>{moment(data.create_at, 'YYYYMMDD').fromNow()}</span>}
                  />
                </Link>
                <Card.Body>
                  <div>
                    {
                      this.returnContent(data.type, data.topic)
                    }
                  </div>
                </Card.Body>
              </Card>
            ))
          }
        </div>
        <TabBar {...this.props} selectedTab="message" />
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.object.isRequired,
};
export default Messages;
