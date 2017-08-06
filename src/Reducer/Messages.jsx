import { GET_MESSAGES } from '../Action/Topics';

const defaultState = {
  messages: {},
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...defaultState,
        messages: action.payload.data.data,
      };
    default:
      return state;
  }
}
