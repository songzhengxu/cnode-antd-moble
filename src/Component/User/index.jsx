import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tabs, Popover, Icon, Modal } from 'antd-mobile';

import NavBar from '../Common/NavBar';
import TabBar from '../Common/TabBar';

import style from './index.css';
import Lists from './List';

moment.locale('zh-cn');
const Item = Popover.Item;
const TabPane = Tabs.TabPane;
const alert = Modal.alert;

export default class User extends Component {
  state = {
    visible: false,
  };
  componentDidMount() {
    // console.log('dd');
  }
  onSelect= (node) => {
    const { history } = this.props;
    this.setState({
      visible: false,
    });
    if (node.key === 'logout') {
      alert('提示', '确认退出登录么???', [
            { text: '取消', onPress: () => {} },
        { text: '确定',
          onPress: () => {
            this.props.loginOut();
            history.push('/');
          } },
      ]);
    }
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    const { user, login } = this.props;
    const data = user.user;
    let offsetX = -10; // just for pc demo
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      offsetX = -26;
    }
    const isLoginUser = data.loginname === login.loginname;
    const title = isLoginUser ? '个人中心' : `${data.loginname}的资料`;
    return (
      <div>
        <NavBar
          {...this.props}
          leftIcon="left"
          title={title}
          rightContent={isLoginUser ?
            <Popover
              mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="logout" value="scan" >退出登录</Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [offsetX, 15],
              }}
              onSelect={this.onSelect}
              onVisibleChange={this.handleVisibleChange}
            >
              <div
                style={{
                  height: '100%',
                  padding: '0 0.3rem',
                  marginRight: '-0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover> : {}
          }
        />
        <div className={style.content}>
          <div className={style.top}>
            <div className={style.img}>
              <img src={data.avatar_url} alt={data.loginname} />
            </div>
            <p className={style.name}>{data.loginname}</p>
            <p>积分: {data.score}  创建时间: {moment(data.create_at, 'YYYYMMDD').fromNow()} </p>

          </div>
          <Tabs defaultActiveKey="topics" swipeable={false} onTabClick={this.onTabClick} >
            <TabPane tab="主题" key="topics">
              <div>
                <Lists datas={data.recent_topics || []} />
              </div>
            </TabPane>
            <TabPane tab="回复" key="eplies">
              <div>
                <Lists datas={data.recent_replies || []} />
              </div>
            </TabPane>
          </Tabs>
        </div>
        <TabBar {...this.props} selectedTab={isLoginUser ? 'my' : ''} />
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  loginOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
