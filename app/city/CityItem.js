import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'
import {View, Text} from 'native-base';
import {TEXT_COLOR, PRESS_COLOR} from '../const/WeatherConst'
import TouchableItem from "../widget/TouchableItem";

export  default  class CityItem extends Component {

    static propTypes = {
        cityName: PropTypes.string,
        isNowCity: PropTypes.bool, //是否为当前城市
        temp: PropTypes.string, //当前温度，可以为null
        weather: PropTypes.string, //当前天气信息，可以为null
        onPress: PropTypes.func,  //点击事件
        onLongPress: PropTypes.func //长按事件
    }

    render() {
        return (
            <TouchableItem
                onLongPress={this.props.onLongPress}
                pressColor={PRESS_COLOR}
                style={cityItemStyle.touch}
                onPress={this.props.onPress}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 20, color: TEXT_COLOR}}>{this.props.cityName}</Text>
                        <Text style={{marginLeft: 3, color: TEXT_COLOR}}>{this.props.isNowCity ? '(当前城市)' : null}</Text>
                    </View>

                    <View style={{marginTop: 40, flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 20, color: TEXT_COLOR}}>{this.props.temp}</Text>
                        <Text style={{marginLeft: 7, color: TEXT_COLOR}}>{this.props.weather}</Text>
                    </View>
                </View>
            </TouchableItem>
        )
    }
}

const cityItemStyle = StyleSheet.create({
    touch: {
        margin: 7,
        borderColor: PRESS_COLOR,
        borderRadius: 4,
        borderWidth: 0.3,
        padding: 20,
        backgroundColor: '#fff'
    }
})
