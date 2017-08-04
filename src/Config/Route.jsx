/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// bundle模型用来异步加载组件
import Bundle from '../Bundle';

// 导入各种组件
//
// // 同步加载
import Home from '../Containers/TopicsContainer'; // 首页组件
import ListView from '../Component/ListView'; // ListView
import NotFoundPage from '../Component/NotFoundPage'; // NotFoundPage

// 异步加载
import loadTopic  from 'bundle-loader?lazy!../Containers/TopicContainer'; // 主题详情

const Topic = props => (
  <Bundle load={loadTopic}>
    {Topic => <Topic {...props} />}
  </Bundle>
);

// 路由配置
const RouteConfig = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={ListView} />
        <Route exact path="/topic/:key" component={Topic} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

// 导出
export default RouteConfig;
