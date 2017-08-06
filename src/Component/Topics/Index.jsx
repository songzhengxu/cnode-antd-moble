import React from 'react';
import NavBar from '../Common/NavBar';
import TabBar from '../Common/TabBar';
import TabPane from './TabPane';

import style from './index.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    };
  }
  render() {
    return (
      <div className="App">
        <NavBar title="主题" />
        <div className={style.content}>
          <TabPane {...this.props} />
        </div>
        <TabBar {...this.props} selectedTab="topic" />
      </div>
    );
  }
}

export default Main;
