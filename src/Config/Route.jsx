/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
// bundle模型用来异步加载组件
import Bundle from '../Bundle';

// 导入各种组件
//
// // 同步加载
import Home from '../Containers/TopicsContainer'; // 首页组件
import NotFoundPage from '../Component/NotFoundPage'; // NotFoundPage





// // 异步加载
import loadTopic  from 'bundle-loader?lazy!../Containers/TopicContainer'; // 主题详情
import loadUser from 'bundle-loader?lazy!../Containers/UserContainer'; // 用户中心
import loadMessages  from 'bundle-loader?lazy!../Containers/MessagesContainer'; // 消息
import loadLogin from  'bundle-loader?lazy!../Containers/LoginContainer'; // 登录
import loadCreate from 'bundle-loader?lazy!../Containers/CreateContainer'; // 发表

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
const Create = props => (
  <Bundle load={loadCreate}>
    {Create => <Create {...props} />}
  </Bundle>
);

const PrivateRoute = ({ component: Component,loginname: loginname,  ...rest }) =>
 (
  <Route {...rest} render={props => (
    loginname? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

// 路由配置
const RouteConfig = (props) => {
  const  { loginname } = props.login;
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute  loginname={loginname}  exact path="/topic/create" component={Create} />
          <Route exact path="/topic/:key" component={Topic} />
          <PrivateRoute  loginname={loginname} exact path="/user/" component={User} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute  loginname={loginname} exact path="/messages" component={Messages} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

// 导出
export default connect(state => (
  { login: state.login }),
)(RouteConfig); // 连接redux
