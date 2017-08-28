import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxpromise from 'redux-promise';
import reducer from '../Reducer/Index';
    // eslint-disable-next-line
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

// eslint-disable-next-line
let store;

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
      combineReducers(reducer),
      composeEnhancers(applyMiddleware(thunk, reduxpromise)),
  );
} else {
  store = createStore(
      combineReducers(reducer),
      applyMiddleware(thunk, reduxpromise),
  );
}

export default store;
