import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListsItem';

function Lists(props) {
  const { topics } = props.topics;
  return (
    <div>
      <ul className="topics_list">
        {topics.length <= 0 ? '加载中' :
          topics.map(data => (
            <ListItem key={data.id} topics={data} />
          ))
        }
      </ul>
    </div>
  );
}
Lists.propTypes = {
  topics: PropTypes.object.isRequired,
};

export default Lists;
