import React, {Component, PropTypes} from 'react';
import {Text, View} from 'native-base';
import {TITLE_COLOR} from '../const/WeatherConst'
import  AqiView from '../widget/AqiView'

export default class AqiItem extends Component {

    aqi: number

    static propTypes = {
        weather: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {aqiColor: TITLE_COLOR}
        let aqi = this.props.weather.aqi.aqi;
        if (aqi == null || aqi == undefined) {
            aqi = 50;
        }
        this.aqi = Number.parseInt(aqi);

        console.log(this.props.weather)
    }


    render() {
        return (
            <View style={{flex: 1, height: 260}}>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>

                    <AqiView width={200} height={200} level={this.aqi}/>

                    <View
                        style={{position: 'absolute', height: 200, alignItems: 'center', justifyContent: 'center'}}>

                        <Text style={{fontSize: 15, color: this.state.aqiColor}}>{this._getAqiIntro()}</Text>

                        <Text style={{color: this.state.aqiColor}}>{this._getAqiLevel()}</Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: TITLE_COLOR}}>{this._getAqiPm2_5()}</Text>
                    </View>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: TITLE_COLOR}}>{this._getAqiPm10()}</Text>
                    </View>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: TITLE_COLOR}}>{this._getAqiSo2()}</Text>
                    </View>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: TITLE_COLOR}}>{this._getAqiNo2()}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _getAqiIntro = () => {
        return '空气' + this.props.weather.aqi.quality
    }

    _getAqiLevel = () => {
        return 'AQI:' + (this.props.weather.aqi.aqi == null ? "未知" : this.props.weather.aqi.aqi)
    }

    componentWillMount() {
        if (this.aqi < 100) {
            this.setState({aqiColor: TITLE_COLOR})
        } else if (this.aqi < 200) {
            this.setState({aqiColor: '#c4bf29'})
        } else {
            this.setState({aqiColor: '#333'})
        }
    }

    _getAqiPm2_5 = () => {
        return 'PM2.5:' + this.props.weather.aqi.pm2_5
    }

    _getAqiPm10 = () => {
        return 'PM10:' + this.props.weather.aqi.pm10
    }

    _getAqiSo2 = () => {
        return 'SO2:' + this.props.weather.aqi.so2
    }
    _getAqiNo2 = () => {
        return 'No2:' + this.props.weather.aqi.so2
    }

}