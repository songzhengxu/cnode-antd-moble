import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import Create from '../Component/Create';
import Api from '../utils/Api';

class CreateContainer extends Component {
  posttopics=(data) => {
    const { accesstoken } = this.props.login;
    const { history } = this.props;
    const data2 = {
      ...data,
      accesstoken,
      tab: data.type[0],
    };

    const response = Api.postTopic(data2);
    response.then(async (v) => {
      if (v.data.success) {
        await Toast.success('操作成功', 1);
        await history.push(`/topic/${v.data.topic_id}`);
      }
    }).catch(e => console.log(e));
  }
  render() {
    return (
      <Create
        posttopics={this.posttopics}
      />
    );
  }
}

CreateContainer.propTypes = {
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

};

export default connect(state => (
  { login: state.login }),
)(CreateContainer); // 连接redux
