import React from 'react';
import PropTypes from 'prop-types';

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
                2017-07-24T23:00:36
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
