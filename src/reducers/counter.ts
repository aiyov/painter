import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  colors: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
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
