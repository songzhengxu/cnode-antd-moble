import axios from 'axios';
import { BASE_WP_URL } from '../Config/Config';

const WP_URL = `${BASE_WP_URL}/api/v1/`;

export const GET_TOPICS = 'GET_TOPICS'; // 获取帖子列表
export const GET_TOPIC = 'GET_TOPIC'; // 获取帖子详情
export const CLEAR_TOPIC = 'CLEAR_TOPIC'; // 清空帖子详情
export const LOGIN = 'LOGIN'; // 登录
export const LOGINOUT = 'LOGINOUT'; // 退出登录
export const GET_USER = 'GET_USER'; // 获取用户信息
export const GET_MESSAGES = 'GET_MESSAGES'; // 获取消息


const defaultQuery = {
  page: 1,
  limit: 10,
  tab: '',
};


export function getTopics(query = defaultQuery) {
  const postQuery = {
    ...defaultQuery,
    ...query,
  };
  const request = axios.get(`${WP_URL}topics`, {
    params: postQuery,
  });

  return {
    type: GET_TOPICS,
    payload: request,
  };
}
// 获取文章详情
export function getTopic(query) {
  const request = axios.get(`${WP_URL}topic/${query.id}?accesstoken=${query.accesstoken}`);
  return {
    type: GET_TOPIC,
    payload: request,
  };
}
// 文章详情页面离开
export function clearTopic() {
  return {
    type: CLEAR_TOPIC,
  };
}
// 获取用户信息
export function getUser(query) {
  const request = axios.get(`${WP_URL}user/${query}`);
  return {
    type: GET_USER,
    payload: request,
  };
}
// 获取消息
export function getMessages(query) {
  const request = axios.get(`${WP_URL}messages`, {
    params: query,
  });
  return {
    type: GET_MESSAGES,
    payload: request,
  };
}
// 标记全部消息为已读
export function markAllmsg(query) {
  axios.post(`${WP_URL}message/mark_all`, {
    accesstoken: query,
  });
  return {
    type: 'MARK_ALL',
  };
}

// 一个异步方法 ，发送请求前，需要先改变loading状态
// 请求成功 返回数据 且改变loading
// 请求失败 范围err信息， 且改变loading

// 登录
export const postLogin = query => async (dispatch) => {
  dispatch({ type: LOGIN, loading: true });
  try {
    const request = await axios.post(`${WP_URL}accesstoken`, { accesstoken: query });
    dispatch(
      { type: LOGIN, loginname: request.data.loginname, accesstoken: query, loading: false },
    );
  } catch (error) {
    if (error.response) {
      dispatch(
        { type: LOGIN, error_msg: error.response.data.error_msg, loading: false, fail: true },
      );
    }
  }
};


// 推出登录
export function loginOut() {
  return {
    type: LOGINOUT,
  };
}
