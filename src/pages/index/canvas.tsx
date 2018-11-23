import {ComponentClass} from 'react';
import Taro, {Component} from '@tarojs/taro';
import PropTypes from 'prop-types';
import {connect} from '@tarojs/redux';
import {Canvas} from '@tarojs/components';

import {draw} from '../../actions/paint'
type PageStateProps = {
  canvas: {
    lineWidth: number,
    colors: Array,
    pathList: Array
  }
}

type PageDispatchProps = {
  draw: (pathList: Array) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Tool {
  props: IProps;
}


@connect(({canvas}) => ({
  canvas
}), (dispatch) => ({
  draw(pathList) {
    dispatch(draw(pathList))
  }
}))

class Paint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos: {}, /*记录moveTO的点*/
      pathList: [], /*路径集合*/
      path: {
        color: '',
        lineWidth: '',
        poslist: []
      },
      ctx: {},
      lineWidth: 2
    }
  }

  componentDidMount() {
    this.setState({
      ctx: Taro.createCanvasContext('canvas', this.$scope)
    })
  }

  componentWillUpdate(nextProps) {
    console.log('==========')
    console.log(nextProps.canvas.pathList.length)
    /*todo 实时传输数据*/
  }

  startdraw(event) {
    this.state.ctx.setLineWidth(this.props.canvas.lineWidth);
    /*设置画布颜色，线条端点样式，线宽*/
    this.state.ctx.setLineCap('round');
    this.state.ctx.setStrokeStyle(this.props.canvas.color)

    this.state.ctx.moveTo(event.touches[0].x, event.touches[0].y)
    /*画点*/
    this.state.ctx.lineTo(event.touches[0].x, event.touches[0].y)
    this.state.ctx.stroke()
    this.state.ctx.draw(true)
    this.copy = {
      color: this.props.canvas.color,
      lineWidth: this.props.canvas.lineWidth,
      poslist: [{x: event.touches[0].x, y: event.touches[0].y}]
    }
    var pathList = this.state.pathList;
    pathList.push(this.copy)
    this.setState({
      pos: {x: event.touches[0].x, y: event.touches[0].y},
      pathList: pathList
    })
  }

  draw(event) {
    this.state.ctx.moveTo(this.state.pos.x, this.state.pos.y)
    this.state.ctx.lineTo(event.touches[0].x, event.touches[0].y)
    this.state.ctx.stroke()
    this.state.ctx.draw(true)

    this.copy.poslist.push({x: event.touches[0].x, y: event.touches[0].y})

    this.setState({
      pos: {x: event.touches[0].x, y: event.touches[0].y}
    })
  }

  drawend() {
    this.props.draw(this.state.pathList)
    // console.log(this.state.pathList)
  }

  render() {
    return (
      <Canvas
        disable-scroll='true'
        style='width: 100%; height: 350px;background-color: #fff'
        canvasId='canvas' ontouchmove={this.draw} ontouchcancel={this.drawend}
        ontouchstart={this.startdraw} ontouchend={this.drawend}
      />
    );
  }
}

export default Paint as ComponentClass<PageOwnProps, PageState>;
