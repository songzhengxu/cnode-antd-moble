import { GET_TOPICS } from '../Action/Topics';

const defaultState = {
  topics: [],
  tab: '',
};

export default function topics(state = defaultState, action) {
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
