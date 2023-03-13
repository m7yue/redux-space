// 定义 action 常量
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

export type CounterAction = IncrementAction | DecrementAction;

// 定义 action 创建函数
export function increment(): IncrementAction {
  return {
    type: INCREMENT
  };
}

export function decrement(): DecrementAction {
  return {
    type: DECREMENT
  };
}

// 定义 reducer 和状态类型
export interface CounterState {
  count: number;
}

// 定义 reducer
function counter(state: CounterState = { count: 0 }, action: CounterAction): CounterState {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export { counter }