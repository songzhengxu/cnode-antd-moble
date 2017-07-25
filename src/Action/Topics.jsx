import axios from 'axios';

import { BASE_WP_URL } from '../Config/Config';

const WP_URL = `${BASE_WP_URL}/api/v1/`;

export const GET_TOPICS = 'GET_TOPICS ';

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
