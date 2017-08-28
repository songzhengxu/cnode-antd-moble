import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import { List, TextareaItem, WingBlank, Button, Toast } from 'antd-mobile';


import style from './index.less';

class CommentBox extends Component {
  handleSubmit = (e, topicId) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitComment(topicId, values.content);
        // 清空评论框
        // code.....
      } else {
        Toast.fail('评论不能为空', 1);
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { repliesId, cancelReplie, topicId } = this.props;
    const msg = repliesId.user ? `回复${repliesId.user}` : '添加评论';
    return (
      <div >
        <div className={style.content}>
          <List
            renderHeader={() => (<div>
              { msg }
              {repliesId.user ? <span className={style.cancel} onClick={() => cancelReplie()}>取消</span> : ''}
            </div>)}
          >
            <TextareaItem
              {...getFieldProps('content', {
                rules: [{ required: true }],
              })}
              placeholder="请输入评论,支持markdown语法"
              rows={5}
              count={100}
            />
          </List>

        </div>
        <WingBlank className={style.btn} size="md">
          <Button onClick={e => this.handleSubmit(e, topicId)} loading={false} className="btn" type="primary">评论</Button>
        </WingBlank>
      </div>
    );
  }
}

CommentBox.propTypes = {
  form: PropTypes.object.isRequired,
  repliesId: PropTypes.object.isRequired,
  cancelReplie: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  topicId: PropTypes.string.isRequired,
};

const CommentBoxWrapper = createForm()(CommentBox);
export default CommentBoxWrapper;
