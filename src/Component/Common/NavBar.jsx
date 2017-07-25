import React from 'react';
import { NavBar, Icon } from 'antd-mobile';


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
        <NavBar
          iconName="null"
          mode="dark"
          rightContent={[
            <Icon key="1" type="ellipsis" />,
          ]}
        >cnodejs</NavBar>
      </div>
    );
  }
  }

export default Main;
