import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function ListsItem(props) {
  const { topics } = props;
  return (
    <li>
      <a href="">
        <p className="tit">
          <i className={topics.top ? 'top icon' : 'icon'}>置顶</i>
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

ListsItem.propTypes = {
  topics: PropTypes.object.isRequired,
};

export default ListsItem;
