import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputItem, WingBlank, Button, List } from 'antd-mobile';
import { createForm } from 'rc-form';

import NavBar from '../Common/NavBar';

import style from './index.less';


class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.postLogin(values.key);
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { loading } = this.props.login;
    return (
      <div>
        <NavBar
          {...this.props}
          leftIcon="left"
          title="登录"
        />
        <div className={style.content}>
          <List renderHeader={() => 'Access Token 需要登录cnode官网登录后设置的最下方'}>
            <InputItem
              {...getFieldProps('key')}
              clear
              placeholder="Access Token"
              autoFocus
            />
          </List>

        </div>
        <WingBlank className={style.btn} size="md">
          <Button onClick={this.handleSubmit} loading={loading} className="btn" type="primary">登录</Button>
        </WingBlank>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  postLogin: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
};
const LoginWrapper = createForm()(Login);
export default LoginWrapper;
