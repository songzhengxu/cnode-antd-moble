import { GET_TOPICS } from '../Action/Topics';

const defaultState = {
  topics: [],
};

export default function posts(state = defaultState, action) {
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
