import { GET_TOPICS } from '../Action';

const defaultState = {
  topics: [],
};

export default function login(state = defaultState, action) {
  switch (action.type) {
    case GET_TOPICS:
      return {
        ...defaultState,
        topics: action.payload.data.data,
      };
    default:
      return state;
  }
}
