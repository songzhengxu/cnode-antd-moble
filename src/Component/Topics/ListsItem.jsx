import React, { Component } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';

class ListsItem extends Component {
  getTag(value) {
    switch (value) {
      case 'share':
        return '分享';
      case 'ask':
        return '问答';
      case 'job':
        return '工作';
      case 'good':
        return '精华';
      default:
        return '';
    }
  }
  render() {
    const { topics } = this.props;
    return (
      <li>
        <a href="">
          <p className="tit">
            <i className={topics.top ? 'top icon' : 'icon'}>{
              topics.top ? '置顶' : this.getTag(topics.tab)
              }</i>
            {topics.title}</p>
          <dl>
            <dt className="avatars" >
              <img src={topics.author.avatar_url} alt={topics.author.loginname} />
            </dt>
            <dd>
              <p className="name">{topics.author.loginname}</p>
              <p className="time">
                {moment(topics.last_reply_at).format('YYYY-MM-DD')}
                <span className="num">{topics.reply_count} / {topics.visit_count} </span>
              </p>
            </dd>
          </dl>
        </a>
      </li>
    );
  }
}

ListsItem.propTypes = {
  topics: PropTypes.object.isRequired,
};

export default ListsItem;
