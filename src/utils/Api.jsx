import axios from 'axios';
import { BASE_WP_URL } from '../Config/Config';

const WP_URL = `${BASE_WP_URL}/api/v1/`;


const Api = {};

// 收藏帖子
Api.postCollect = async function postCollect(query) {
  const request = await axios.post(`${WP_URL}/topic_collect/collect`, {
    ...query,
  });
  return request;
};

// 取消收藏帖子
Api.postUnCollect = async function postUnCollect(query) {
  const request = await axios.post(`${WP_URL}/topic_collect/de_collect `, {
    ...query,
  });
  return request;
};

// 点赞
Api.postUps = async function postUps(query) {
  const request = await axios.post(`${WP_URL}/reply/${query.id}/ups`, {
    ...query,
  });
  return request;
};

// 评论
Api.postComment = async function postComment(query) {
  const request = await axios.post(`${WP_URL}/topic/${query.id}/replies`, {
    ...query,
  });
  return request;
};

// 发表帖子
Api.postTopic = async function postTopic(query) {
  const request = await axios.post(`${WP_URL}/topics`, {
    ...query,
  });
  return request;
};

export default Api;
