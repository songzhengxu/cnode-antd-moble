import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import App from './Config/Route'; // 路由配置
import store from './Config/Store'; // 引入Store

// 导入 i18n 配置文件


/* eslint-disable */
import 'normalize.css';
import './Style/reset.css';
import './Style/index.css';

import  Tool  from './utils/Tool';
// 订阅state改变
store.subscribe(() => {
  // 把User保存在本地，防止刷新丢失
  Tool.localItem('login', JSON.stringify(store.getState().login));
  // 订阅全局的其他状态，
});


const render = (Component) => {
  ReactDOM.render(
    <AppContainer >
          <Provider store={store}>
            <Component />
          </Provider>
    </AppContainer>, document.getElementById('root'));
};

render(App);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('./Config/Route', () => {
    render(App);
  });
}
