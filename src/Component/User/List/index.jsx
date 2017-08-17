import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import style from './index.less';

moment.locale('zh-cn');

function Lists(props) {
  const { datas } = props;
  return (
    <div>
      <ul className="topics_list">
        {datas.length <= 0 ? '加载中' :
          datas.map(data => (
            <li key={data.id} className={style.listItem}>
              <Link to={`/topic/${data.id}`}>
                <div className={style.box}>
                  <div className={style.tit}>{data.title}</div>
                  <div className={style.data}>{moment(data.last_reply_at, 'YYYYMMDD').fromNow()}</div>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
Lists.propTypes = {
  datas: PropTypes.array.isRequired,
};

export default Lists;
