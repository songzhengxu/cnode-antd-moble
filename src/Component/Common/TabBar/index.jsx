import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import style from './index.less';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topic',
      hidden: false,
    };
  }
  render() {
    const { history, selectedTab, badge } = this.props;
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
            icon={<div className={style.icon}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-tiezi" />
              </svg>
            </div>
          }
            selectedIcon={<div className={style.icon}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-tiezi" />
              </svg>
            </div>
          }
            selected={selectedTab === 'topic'}
            onPress={() => {
              history.push('/');
            }}
          />
          <TabBar.Item
            icon={<div className={style.icon}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-fabiao" />
              </svg>
            </div>}
            selectedIcon={<div className={style.icon}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-fabiao" />
              </svg>
            </div>}
            title="发表"
            key="发表"
            selected={selectedTab === 'create'}
            onPress={() => {
              history.push('/topic/create');
            }}
          />
          <TabBar.Item
            icon={
              <div className={style.icon}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-xiaoxi" />
                </svg>
              </div>
          }
            selectedIcon={
              <div className={style.icon}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-xiaoxi" />
                </svg>
              </div>
          }
            title="消息"
            key="消息"
            badge={badge}
            selected={selectedTab === 'message'}
            onPress={() => {
              history.push('/messages');
            }}
          />
          <TabBar.Item
            icon={<div className={style.icon}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-gerenzhongxinxia" />
              </svg>
            </div>}
            selectedIcon={<div className={style.icon}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-gerenzhongxinxia" />
              </svg>
            </div>}
            title="我的"
            key="我的"
            selected={selectedTab === 'my'}
            onPress={() => {
              history.push('/user/');
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
  badge: PropTypes.number,
};
Main.defaultProps = {
  badge: null,
};
export default Main;
