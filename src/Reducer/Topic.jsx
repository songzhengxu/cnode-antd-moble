import { GET_TOPIC } from '../Action/Topics';

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
    default:
      return state;
  }
}
