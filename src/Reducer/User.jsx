import { GET_USER } from '../Action/Topics';

const defaultState = {
  user: {},
  loginname: '',
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...defaultState,
        user: action.payload.data.data,
      };
    default:
      return state;
  }
}
