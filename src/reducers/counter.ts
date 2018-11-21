import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  colors: [1,2,3,4,5,6,7]
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
     default:
       return state
  }
}
