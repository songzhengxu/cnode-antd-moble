import React from 'react';
import { Tabs } from 'antd-mobile';
import Lists from './Lists';

const TabPane = Tabs.TabPane;

class Main extends React.Component {
  componentDidMount() {
    console.log('ok');
  }
  render() {
    return (
      <Tabs defaultActiveKey="1" swipeable={false} >
        <TabPane tab="全部" key="1">
          <div >
            <Lists {...this.props} />
          </div>
        </TabPane>
        <TabPane tab="精华" key="2">
          <div>
            选项卡二内容
          </div>
        </TabPane>
        <TabPane tab="分享" key="3">
          <div>
              选项卡三内容
            </div>
        </TabPane>
        <TabPane tab="问答" key="4">
          <div>
              问答
            </div>
        </TabPane>
        <TabPane tab="招聘" key="5">
          <div>
              招聘
            </div>
        </TabPane>
      </Tabs>
    );
  }
}

export default Main;
