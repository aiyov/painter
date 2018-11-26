import {ComponentClass} from 'react';
import Taro, {Component} from '@tarojs/taro';
import PropTypes from 'prop-types';
import {connect} from '@tarojs/redux';
import {View, Image, Text, Slider, ScrollView} from '@tarojs/components';

import Back from '../../assets/ico/back.svg';
import Delete from '../../assets/ico/delete.svg';
import Eraser from '../../assets/ico/eraser.svg';

import {changeColor, changeLineWidth, draw} from '../../actions/paint'


type PageStateProps = {
  canvas: {
    lineWidth: number,
    colors: Array,
    pathList: Array
  }
}

type PageDispatchProps = {
  changeColor: (color: string) => void,
  changeLineWidth: (lineWidth: object) => void,
  draw: (pathList: object) => void
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
  changeColor(color) {
    dispatch(changeColor(color))
  },
  changeLineWidth(slider) {
    dispatch(changeLineWidth(slider.detail.value))
  },
  draw(pathList) {
    dispatch(draw(pathList))
  }
}))

class Tool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeBg: 0 /*默认不添加点击背景色*/
    }
  }

  static options = {
    addGlobalClass: true
  }

  draw() {
    var length = this.props.canvas.pathList.length;
    var pathList = this.props.canvas.pathList.slice(0, length - 1)
    this.setState({
      activeBg: 1 /*按钮背景*/
    })
    this.props.draw(pathList)
  }

  clearCanvas() {
    this.setState({
      activeBg: 2 /*按钮背景*/
    })
    Taro.showModal({
      title: '提示',
      content: '真的要清空画布吗？',
      cancelText: '假的',
      confirmText: '真的',
      confirmColor: '#79d1b9'
    }).then(res => {
      if (res.confirm) {
        this.props.draw([]);
      }
    })
  }

  removeBg() {
    this.setState({
      activeBg: 0 /*取消返回按钮背景*/
    })
  }

  render() {
    return (
      <View>
        <View className='tool'>
          <View className='lineWidth'>
            <Text>粗细</Text>
            <Slider
              className='slider' activeColor={this.props.canvas.color} blockSize='16'
              backgroundColor="#fff" step='1' value={this.props.canvas.lineWidth}
              showValue min='2' max='20' onChange={this.props.changeLineWidth}
            />
          </View>
          <View className='operate'>
            <View className={this.activeBg == 1 ? 'activeIco ico' : 'ico'} onTouchend={this.removeBg.bind(this)}
                  onTouchstart={this.draw.bind(this)}>
              <Image style='width: 20px;height: 20px;padding-left: 5px' src={Back}/>
            </View>
            <View className={this.props.canvas.color === '#fff' ? 'activeIco ico' : 'ico'}
                  onClick={this.props.changeColor.bind(this, '#fff')}>
              <Image style='width: 20px;height: 20px;' src={Eraser}/>
              <Text>橡皮</Text>
            </View>
            <View className={this.activeBg == 2 ? 'activeIco ico' : 'ico'} onTouchstart={this.clearCanvas.bind(this)}
                  onTouchend={this.removeBg.bind(this)}>
              <Image style='width: 20px;height: 20px;' src={Delete}/>
              <Text>清除</Text>
            </View>
          </View>
        </View>
        <View className='colors'>
          <Text className='colorTitle'>颜色</Text>
          <ScrollView scrollX='true' className='colorsScroll'>
            {this.props.canvas.colors.map((item, index) => {
              return <View style={`background:${item}`} onClick={this.props.changeColor.bind(this, item)}
                           className={item===this.props.canvas.color?`color-${item.slice(1)} color`:`color`} key={index}></View>
            })}
          </ScrollView>
        </View>
        <Text className='scrollTip'>*左划选更多颜色</Text>
      </View>
    )
  }
}

Tool.propTypes = {
  colors: PropTypes.array,
  lineWidth: PropTypes.number
}

export default Tool as ComponentClass<PageOwnProps, PageState>
