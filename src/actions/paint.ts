import {
  CHANGCOLOR,
  CHANGELINEWIDTH,
  DRAW,
  SOCKET,
  CHAT
} from '../constants/canvas'

export const changeColor = (color:string) => {
  return {
    type: CHANGCOLOR,
    color
  }
}
export const changeLineWidth = (lineWidth:number) => {
  return {
    type: CHANGELINEWIDTH,
    lineWidth
  }
}
export const draw = (pathList:Array<{}>) => {
  return {
    type: DRAW,
    pathList
  }
}
export const chat = (words:Object) => {
  return {
    type: CHAT,
    words
  }
}
export function socket(socketio) {
  return {
    type: SOCKET,
    socketio
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
