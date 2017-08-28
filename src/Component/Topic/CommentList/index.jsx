import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd-mobile';
import moment from 'moment';

import style from './index.less';
import box from '../markdown.less'; // markdown css

moment.locale('zh-cn');

class CommentList extends Component {
  componentDidMount() {

  }
  render() {
    const createMarkup = content => ({
      __html: content,
    });
    const { ups, repliesList, topic, replies } = this.props;
    return (
      <div className={style.pinlun}>
        <div className={style.pinlunHead}>
          共<span className={style.pl_num}>{topic.replies.length}</span>
          条评论 </div>
        {
          repliesList.map((replie, index) => (
            <Card key={replie.id}>
              <Card.Header
                title={
                  <p className={style.name}>
                    {replie.author.loginname} &nbsp;
                    <span className="data">{moment(replie.create_at, 'YYYYMMDD').fromNow()}</span>
                  </p>}
                thumb={replie.author.avatar_url}
                thumbStyle={{ width: 120 }}
                extra={<span>#{index}</span>}
              />
              <Card.Body>
                <div
                  className={box.markdown}
                  dangerouslySetInnerHTML={createMarkup(replie.content)}
                />
              </Card.Body>
              <Card.Footer
                extra={<div>
                  <div
                    className={style.icon2}
                    onClick={() => replies(replie.id, replie.author.loginname)}
                  >
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-pinglun" />
                    </svg>
                  </div>
                  <div
                    className={style.icon2}
                    onClick={() => ups(topic.id, replie.id, replie.author.loginname)}
                  >
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref={replie.is_uped ? '#icon-dianzan1' : '#icon-dianzan'} />
                    </svg>
                  </div>

                </div>}
              />
            </Card>
          ))
        }

      </div>
    );
  }
}
CommentList.propTypes = {
  topic: PropTypes.object.isRequired,
  repliesList: PropTypes.object.isRequired,
  replies: PropTypes.func.isRequired,
  ups: PropTypes.func.isRequired,
};
export default CommentList;
