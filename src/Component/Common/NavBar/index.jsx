import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';


import style from './index.css';

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
    history.goBack();
  }
  render() {
    const { leftIcon, rightContent, title } = this.props;
    console.log(rightContent);
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
