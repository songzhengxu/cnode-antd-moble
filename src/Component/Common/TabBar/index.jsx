import React from 'react';
import { TabBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topic',
      hidden: false,
    };
  }
  render() {
    const { history, selectedTab, badge, loginname } = this.props;
    return (
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="主题"
            key="主题"
            icon={<div
              style={{
                width: '0.44rem',
                height: '0.44rem',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
            selectedIcon={<div
              style={{
                width: '0.44rem',
                height: '0.44rem',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
            selected={selectedTab === 'topic'}
            onPress={() => {
              history.push('/');
            }}
          />
          <TabBar.Item
            icon={<Icon type="koubei-o" size="md" />}
            selectedIcon={<Icon type="koubei" size="md" />}
            title="发表"
            key="发表"
            selected={selectedTab === 'create'}
            onPress={() => {
              history.push('/topic/create');
            }}
          />
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '0.44rem',
                  height: '0.44rem',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
              />
          }
            selectedIcon={
              <div
                style={{
                  width: '0.44rem',
                  height: '0.44rem',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
              />
          }
            title="消息"
            key="消息"
            badge={badge}
            selected={selectedTab === 'message'}
            onPress={() => {
              if (loginname) {
                history.push('/messages');
              } else {
                history.push('/login');
              }
            }}
          />
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="我的"
            selected={selectedTab === 'my'}
            onPress={() => {
              if (loginname) {
                history.push(`/user/${loginname}`);
              } else {
                history.push('/login');
              }
            }}
          />
        </TabBar>
      </div>
    );
  }
}
Main.propTypes = {
  history: PropTypes.object.isRequired,
  selectedTab: PropTypes.string.isRequired,
  loginname: PropTypes.string,
  badge: PropTypes.number,
};

Main.defaultProps = {
  loginname: '',
  badge: null,
};
export default Main;
