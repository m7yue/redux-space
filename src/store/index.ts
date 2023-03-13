import {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose
} from 'redux'

import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { counter, increment, decrement, CounterState, CounterAction } from './counter'

// 定义 rootReducer，使用 combineReducers 函数将多个 reducer 合并为一个
const rootReducer = combineReducers({
  counter,
});

// 创建 middleware，这里使用了 redux-thunk 和 redux-logger 两个 middleware
const loggerMiddleware = createLogger();


// 创建 store，使用 applyMiddleware 函数将 middleware 应用到 store 上
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(loggerMiddleware),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);



// 定义 action creator 和 dispatch 类型
interface ActionCreators {
  increment: () => void;
  decrement: () => void;

  incrementAsync: () => void
}

type DispatchType = typeof store.dispatch;

// 创建 action creator，使用 bindActionCreators 函数将多个 action creator 绑定到 dispatch 上
const actions: ActionCreators = bindActionCreators({
  increment,
  decrement,
  incrementAsync
}, store.dispatch);

// 定义异步 action 创建函数，使用 ThunkAction 类型来定义返回值类型
function incrementAsync(): ThunkAction<void, CounterState, unknown, CounterAction> {
  // if (typeof action === 'function') {
  //   // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
  //   return action(dispatch, getState, extraArgument);
  // }

  return (dispatch, getState) => {
    console.log(getState(), 777777)
    setTimeout(() => {
      dispatch(increment());
    }, 3000);
  };
}

// 打印初始状态
console.log('初始状态：', store.getState());

// 订阅 store 的变化
store.subscribe(() => {
  console.log('当前状态：', store.getState());
});

// 分发 action
actions.increment();
actions.increment();
actions.decrement();
// @ts-ignore
// store.dispatch(incrementAsync());
actions.incrementAsync()

// 打印最终状态
console.log('最终状态：', store.getState());

// 异步 action 形如 incrementAsync