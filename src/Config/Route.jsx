/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// bundle模型用来异步加载组件
import Bundle from '../Bundle';

// 导入各种组件
//
// // 同步加载
import Home from '../Containers/TopicsContainer'; // 首页组件
import NotFoundPage from '../Component/NotFoundPage'; // NotFoundPage

import Create from '../Component/Create'; // 发表



// // 异步加载
import loadTopic  from 'bundle-loader?lazy!../Containers/TopicContainer'; // 主题详情
import loadUser from 'bundle-loader?lazy!../Containers/UserContainer'; // 用户中心
import loadMessages  from 'bundle-loader?lazy!../Containers/MessagesContainer'; // 消息
import loadLogin from  'bundle-loader?lazy!../Containers/LoginContainer'; // 登录


const Topic = props => (
  <Bundle load={loadTopic}>
    {Topic => <Topic {...props} />}
  </Bundle>
);
const Messages = props => (
  <Bundle load={loadMessages}>
    {Messages => <Messages {...props} />}
  </Bundle>
);
const User = props => (
  <Bundle load={loadUser}>
    {User => <User {...props} />}
  </Bundle>
);
const Login = props => (
  <Bundle load={loadLogin}>
    {Login => <Login {...props} />}
  </Bundle>
);

// 路由配置
const RouteConfig = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/topic/create" component={Create} />
        <Route exact path="/topic/:key" component={Topic} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/messages" component={Messages} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

// 导出
export default RouteConfig;
