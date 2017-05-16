import React, {Component, PropTypes} from 'react';
import {Image, TouchableOpacity} from 'react-native'
import {Text, View} from 'native-base';
import {TITLE_COLOR, GetWeatherImage} from '../const/WeatherConst'
import  WeatherWindow from '../widget/WeatherWindow'

export  default class TempItem extends Component {

    static propTypes = {
        weather: PropTypes.object
    }


    render() {
        return (
            <View style={{flex: 1, height: 260, padding: 12, alignItems: 'center'}}>
                <View style={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    paddingRight: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <View style={{backgroundColor: TITLE_COLOR, borderRadius: 20}}>
                        <Image
                            style={{margin: 5}}
                            source={this._getWeatherImg()}/>
                    </View>
                    <Text style={{marginLeft: 7, color: TITLE_COLOR}}>{this._getWeather()}</Text>
                </View>
                <Text
                    onPress={() => this._showWeatherWindow()}
                    style={{marginTop: 10, color: TITLE_COLOR, fontSize: 120}}>{this._getTemp()}</Text>

                <View style={{flexDirection: 'row'}}>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: TITLE_COLOR}}>{this._getHumidity()}</Text>
                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text
                            numberOfLines={1}
                            style={{color: TITLE_COLOR} }>{this._getWindInfo()}</Text>
                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: TITLE_COLOR,}}>{this._getUpdateTime()}</Text>
                    </View>
                </View>

                <Text style={{marginTop: 10, color: '#33b5e5'}}>{this._getWeatherAffect()}</Text>

                <WeatherWindow
                    ref="window"
                    modalVisible={false}
                    hourlyInfo={this.props.weather.hourly}/>
            </View>);
    }

    //显示天气的弹窗
    _showWeatherWindow = () => {
        this.refs.window._showModel()
    }

    //返回天气小图标
    _getWeatherImg = () => {
        let str = this.props.weather.weather;
        return GetWeatherImage(str)
    }

    //返回天气信息，如晴，多云等
    _getWeather = () => {
        return this.props.weather.weather;
    }

    //返回温度信息
    _getTemp = () => {
        return this.props.weather.temp;
    }

    //返回湿度信息
    _getHumidity = () => {
        return "湿度:" + this.props.weather.humidity;
    }

    //返回风力信息
    _getWindInfo = () => {
        return this.props.weather.winddirect + this.props.weather.windpower
    }

    //返回更新时间
    _getUpdateTime = () => {
        return this.props.weather.updatetime.split(" ")[1] + "更新"
    }

    //返回天气描述
    _getWeatherAffect = () => {
        return this.props.weather.aqi.aqiinfo.affect
    }
}