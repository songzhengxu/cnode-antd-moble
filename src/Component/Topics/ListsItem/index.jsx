import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import style from './index.css';

class ListsItem extends Component {
  getTag(value, good) {
    if (good) { return '精华'; }
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
        return '未分类';
    }
  }
  render() {
    const { topics } = this.props;
    return (
      <li className={style.listItem}>
        <Link to={`/topic/${topics.id}`}>
          <p className={style.tit}>
            <i className={topics.top || topics.good ? style.top : style.icon}>{
              topics.top ? '置顶' : this.getTag(topics.tab, topics.good)
              }</i>
            {topics.title}</p>
          <dl>
            <dt className={style.avatars} >
              <img
                className={style.avatarsimg}
                src={topics.author.avatar_url}
                alt={topics.author.loginname}
              />
            </dt>
            <dd>
              <p className={style.name}>{topics.author.loginname}</p>
              <p className={style.time}>
                {moment(topics.last_reply_at).format('YYYY-MM-DD')}
                <span className={style.num}>{topics.reply_count} / {topics.visit_count} </span>
              </p>
            </dd>
          </dl>
        </Link>
      </li>
    );
  }
}

ListsItem.propTypes = {
  topics: PropTypes.object.isRequired,
};

export default ListsItem;
