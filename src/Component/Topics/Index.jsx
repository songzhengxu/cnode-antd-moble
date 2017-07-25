import React from 'react';
import NavBar from '../Common/NavBar';
import TabBar from '../Common/TabBar';
import TabPane from './TabPane';


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
        <NavBar />
        <TabPane {...this.props} />
        <TabBar />
      </div>
    );
  }
}

export default Main;
