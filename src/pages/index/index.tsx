import {ComponentClass} from 'react';
import Taro, {Component, Config} from '@tarojs/taro';
import {View, Button} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import Paint from './canvas'
import Header from './header'
import Tool from './tool'

import {changeColor, minus, asyncAdd} from '../../actions/paint'

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
  canvas: {
    num: number,
    colors: [],
    color: string
  }
}

type PageDispatchProps = {
  changeColor: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({canvas}) => ({
  canvas
}), (dispatch) => ({
  changeColor(a) {
    dispatch(changeColor(a))
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
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidMount() {
    var CreateWebSocket = (function () {
      return function (urlValue) {
        console.log(WebSocket)
        if (WebSocket) return new WebSocket(urlValue);
        // if (MozWebSocket) return new MozWebSocket(urlValue);
        return false;
      }
    })()
    // 实例化websoscket websocket有两种协议ws(不加密)和wss(加密)
    var webSocket = Taro.connectSocket({
      url: 'ws://192.168.28.108:3000/paint/test/123'
    })
    console.log(webSocket)
    webSocket.onopen = function (evt) {
      // 一旦连接成功，就发送第一条数据
      webSocket.send("第一条数据")
    }
    webSocket.onmessage = function (evt) {
      // 这是服务端返回的数据
      console.log("服务端说" + evt.data)
    }
    // 关闭连接
    webSocket.onclose = function (evt) {
      console.log("Connection closed.")
    }
  }

  render() {
    return (
      <View className='index'>
        <Header />
        <View>
          <Paint />
        </View>
        <Tool />
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
