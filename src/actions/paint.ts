import {
  CHANGCOLOR,
  CHANGELINEWIDTH
} from '../constants/canvas'

export const changeColor = (color) => {
  return {
    type: CHANGCOLOR,
    color
  }
}
export const changeLineWidth = (lineWidth) => {
  return {
    type: CHANGELINEWIDTH,
    lineWidth
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(minus())
    }, 2000)
  }
}
