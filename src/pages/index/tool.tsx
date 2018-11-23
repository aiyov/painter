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
  changeColor: (color:string) => void,
  changeLineWidth: (lineWidth:object) => void,
  draw: (pathList:object) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Tool {
  props: IProps;
}


@connect(({canvas}) => ({
  canvas
}),(dispatch) => ({
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
  }

  static options = {
    addGlobalClass: true
  }

  draw() {
    var length = this.props.canvas.pathList
    var pathList = this.props.canvas.pathList.slice(0, length-1)
    this.props.draw(pathList)
  }

  componentDidShow() {
  }

  render() {
    return (
      <View>
        <View className='tool'>
          <View className='lineWidth'>
            <Text>粗细</Text>
            <Slider
              className='slider' activeColor={this.props.canvas.color} blockSize='16'
              backgroundColor="#fff" step='1' value= {this.props.canvas.lineWidth}
              showValue min='2' max='20' onChange={this.props.changeLineWidth}
            />
          </View>
          <View className='operate'>
            <View className='ico' onClick={this.draw.bind(this)}>
              <Image style='width: 20px;height: 20px;' src={Back} />
            </View>
            <View className='ico' onClick={this.props.changeColor.bind(this,'#fff')}>
              <Image style='width: 20px;height: 20px;margin-right:3px;' src={Eraser} />
              <Text>橡皮</Text>
            </View>
            <View className='ico'>
              <Image style='width: 20px;height: 20px;margin-right:3px;' src={Delete} />
              <Text>清除</Text>
            </View>
          </View>
        </View>
        <View className='colors'>
          <Text className='colorTitle'>颜色</Text>
          <ScrollView scrollX='true' className='colorsScroll'>
            {this.props.canvas.colors.map((item, index) => {
              return <View style={`background:${item}`} onClick={this.props.changeColor.bind(this,item)} className='color' key={index}></View>
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
