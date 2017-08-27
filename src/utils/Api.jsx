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

// 收藏帖子
Api.postUps = async function postUps(query) {
  const request = await axios.post(`${WP_URL}/reply/${query.id}/ups`, {
    ...query,
  });
  return request;
};

export default Api;
