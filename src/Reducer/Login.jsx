import { LOGIN, LOGINOUT } from '../Action';
import Tool from '../utils/Tool';

const defaultState = {
  loginname: '',
  loading: false,
  accesstoken: '',
  error_msg: '',
  fail: false,
};

export default function login(state = Tool.localItem('login') ? JSON.parse(Tool.localItem('login')) : defaultState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...defaultState,
        loginname: action.loginname,
        accesstoken: action.accesstoken,
        loading: action.loading,
        error_msg: action.error_msg,
        fail: action.fail,
      };
    case LOGINOUT:
      return {
        loginname: '',
      };
    default:
      return state;
  }
}
