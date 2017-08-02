import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd-mobile';
import Lists from '../Lists';


const TabPane = Tabs.TabPane;


class TabPaneClass extends React.Component {
  constructor(props) {
    super(props);
    this.onTabClick = this.onTabClick.bind(this);
  }
  onTabClick(key) {
    this.props.getTopics({
      tab: key,
    });
  }
  render() {
    return (
      <Tabs defaultActiveKey="all" swipeable={false} onTabClick={this.onTabClick} >
        <TabPane tab="全部" key="all">
          <div>
            <Lists {...this.props} />
          </div>
        </TabPane>
        <TabPane tab="精华" key="good">
          <div>
            <Lists {...this.props} />
          </div>
        </TabPane>
        <TabPane tab="分享" key="share">
          <div>
            <Lists {...this.props} />
          </div>
        </TabPane>
        <TabPane tab="问答" key="ask">
          <div>
            <Lists {...this.props} />
          </div>
        </TabPane>
        <TabPane tab="招聘" key="job">
          <div>
            <Lists {...this.props} />
          </div>
        </TabPane>
      </Tabs>
    );
  }
}
TabPaneClass.propTypes = {
  getTopics: PropTypes.func.isRequired,
};


export default TabPaneClass;
