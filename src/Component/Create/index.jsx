import React from 'react';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import { Picker, List, InputItem, TextareaItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import NavBar from '../Common/NavBar';

import style from './index.css';

const district = [
  {
    value: 'ask',
    label: '问答',
  }, {
    value: 'share',
    label: '分享',
  }, {
    value: 'job',
    label: '工作',
  }, {
    value: 'dev',
    label: '测试',
  }];

class CreateMain extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="App">
        <NavBar {...this.props} leftIcon="back" />
        <div className={style.content}>
          <Picker data={district} cols={1} {...getFieldProps('type')} className="forss">
            <List.Item arrow="horizontal">选择类型</List.Item>
          </Picker>
          <List>
            <InputItem
              {...getFieldProps('title')}
              clear
              placeholder="请输入标题"
            >标题</InputItem>
          </List>
          <List>
            <TextareaItem
              {...getFieldProps('content')}
              rows={10}
              placeholder="请输入内容"
            />
          </List>
          <WhiteSpace size="lg" />
          <WingBlank size="md"><Button onClick={this.handleSubmit} className="btn" type="primary">发布</Button></WingBlank>
        </div>
      </div>
    );
  }
}
CreateMain.propTypes = {
  form: PropTypes.object.isRequired,
};

const TestWrapper = createForm()(CreateMain);
export default TestWrapper;