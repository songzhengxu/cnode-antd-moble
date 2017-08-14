import { GET_TOPIC, CLEAR_TOPIC } from '../Action';

const defaultState = {
  topic: {},
  key: '',
};

export default function topic(state = defaultState, action) {
  switch (action.type) {
    case GET_TOPIC:
      return {
        ...defaultState,
        topic: action.payload.data.data,
      };
    case CLEAR_TOPIC:
      return defaultState;
    default:
      return state;
  }
}
