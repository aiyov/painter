import Taro, {Component} from '@tarojs/taro';
import PropTypes from 'prop-types';
import {View, Image, Text, Icon} from '@tarojs/components';

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  static options = {
    addGlobalClass: true
  }
  render() {
    return (
      <View className='icos'>
        <View className='painterWrapper'>
          <Image
            style='margin-right: 10px;width: 30px;height: 30px;background: #fff; vertical-align:top;box-shadow: 3px 3px #da0289;'
            src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
          />
          <Text>题目：死党</Text>
          <Icon className='topic' size='14' type='clear' color='red'/>
        </View>
        <View className='player'>
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
    )
  }
}

Header.propTypes = {
  palyer: PropTypes.array
};
