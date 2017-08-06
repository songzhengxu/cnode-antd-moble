import axios from 'axios';

import { BASE_WP_URL } from '../Config/Config';

const WP_URL = `${BASE_WP_URL}/api/v1/`;

export const GET_TOPICS = 'GET_TOPICS ';
export const GET_TOPIC = 'GET_TOPIC ';
export const GET_USER = 'GET_USER ';
export const GET_MESSAGES = 'GET_MESSAGES ';


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

export function getTopic(query) {
  const request = axios.get(`${WP_URL}topic/${query}`);
  return {
    type: GET_TOPIC,
    payload: request,
  };
}

export function getUser(query) {
  const request = axios.get(`${WP_URL}user/${query}`);
  return {
    type: GET_USER,
    payload: request,
  };
}

export function getMessages(query) {
  const request = axios.get(`${WP_URL}messages`, {
    params: query,
  });
  return {
    type: GET_MESSAGES,
    payload: request,
  };
}
// 标记全部为已读
export function markAllmsg(query) {
  axios.post(`${WP_URL}message/mark_all`, {
    ...query,
  });
  return {
    type: 'MARK_ALL',
  };
}
