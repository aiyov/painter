import {CHANGCOLOR, CHANGELINEWIDTH, DRAW, CHAT, SOCKET} from '../constants/canvas'

const INITIAL_STATE = {
  lineWidth: 10,
  colors: ['#fc039d', '#ff4d3f', '#fda601', '#fff001',
    '#010101', '#00b282', '#004bfe', '#c9c9c9', '#8efbf6',
    '#79d1b9', '#bb18fd', '#ffffcd', '#fdcdb7', '#993400',
    '#966b5a', '#fca7a4', '#eb2429', '#2b5e7d', '#4b495e',
    '#e6d23f', '#626262', '#63b00c', '#63f5c4', '#17baf3'
  ],
  color: '#fff001',
  pathList: []/*路径集合*/,
  Chat: [],
  socket: null
}

export default function canvas(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGCOLOR:
      return {
        ...state,
        color: action.color
      }
    case CHANGELINEWIDTH:
      return {
        ...state,
        lineWidth: action.lineWidth
      }
    case DRAW:
      return {
        ...state,
        pathList: action.pathList
      }
    case CHAT:
      return {
        ...state,
        chat: action.chat
      }
    case SOCKET:
      return {
        ...state,
        socket: action.socketio
      }
    default:
      return state
  }
}
