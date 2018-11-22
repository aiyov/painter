import {ComponentClass} from 'react';
import Taro, {Component, Config} from '@tarojs/taro';
import {View, Button, Text, Icon, Canvas, Slider, ScrollView} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import Paint from '../../components/canvas'

import Back from '../../assets/ico/back.svg';
import Delete from '../../assets/ico/delete.svg';
import Eraser from '../../assets/ico/eraser.svg';


import {add, minus, asyncAdd} from '../../actions/counter'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number,
    colors: []
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({counter}) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '你画我猜',
    navigationBarBackgroundColor: '#fff001',
    navigationBarTextStyle: "black",
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <View className="icos">
          <View className="painterWrapper">
            <Image
              style='margin-right: 10px;width: 30px;height: 30px;background: #fff; vertical-align:top;box-shadow: 3px 3px #da0289;'
              src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
            />
            <Text>题目：死党</Text>
            <Icon className="topic" size='14' type='clear' color='red'/>
          </View>
          <View className="player">
            <Image
              style='width: 30px;height: 30px;margin-left:10px;background: #fff;'
              src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
            />
            <Image
              style='width: 30px;height: 30px;margin-left:10px;background: #fff;'
              src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
            />
            <Image
              style='width: 30px;height: 30px;margin-left:10px;background: #fff;'
              src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
            />
          </View>
        </View>
        <View>
          <Paint />
        </View>
        <View className="tool">
          <View className="lineWidth">
            <Text>粗细</Text>
            <Slider className="slider" activeColor='#fdcdb7' blockSize='16' backgroundColor="#fff" step='1' value='20'
                    showValue min='0' max='100'/>
          </View>
          <View className="operate">
            <View className="ico">
              <Image
                style='width: 20px;height: 20px;'
                src={Back}
              />
            </View>
            <View className="ico">
              <Image
                style='width: 20px;height: 20px;margin-right:3px;'
                src={Eraser}
              />
              <Text>橡皮</Text>
            </View>
            <View className="ico">
              <Image
                style='width: 20px;height: 20px;margin-right:3px;'
                src={Delete}
              />
              <Text>清除</Text>
            </View>
          </View>
        </View>
        <View className="colors">
          <Text className="colorTitle">颜色</Text>
          <ScrollView scrollX="true" className="colorsScroll">
            {this.props.counter.colors.map((item, index) => {
              return <View className="color" key={index}>{item}</View>
            })}
          </ScrollView>
        </View>
        <Text className="scrollTip">*左划选更多颜色</Text>
        <Button size="max" className="btn">发起猜猜</Button>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
