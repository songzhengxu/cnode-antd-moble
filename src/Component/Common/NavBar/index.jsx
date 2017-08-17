import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';


import style from './index.less';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    };
  }
  leftClick = () => {
    const { history } = this.props;
    // 如果历史记录个数小于等于1，则跳转到首页，
    // 比如打开别人的分享详情页面，则历史记录为1 ；  history.goBack()没反应
    if (history.length <= 1) {
      history.push('/');
    } else {
      history.goBack();
    }
  }
  render() {
    const { leftIcon, rightContent, title } = this.props;
    return (
      <div className={style.NavBar}>
        <NavBar
          mode="dark"
          iconName={leftIcon ? 'left' : 'null'}
          onLeftClick={this.leftClick}
          rightContent={rightContent.props ? rightContent : ''}
        > {title}</NavBar>
      </div>
    );
  }
}
Main.propTypes = {
  history: PropTypes.object,
  leftIcon: PropTypes.string,
  rightContent: PropTypes.object,
  title: PropTypes.string,
};
Main.defaultProps = {
  history: {},
  leftIcon: '',
  rightContent: {},
  title: '标题',
};


export default Main;
