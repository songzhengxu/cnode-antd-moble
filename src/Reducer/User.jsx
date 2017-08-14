import { GET_USER } from '../Action';

const defaultState = {
  user: {},
  loading: false,
  error_msg: '',
  fail: false,
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
