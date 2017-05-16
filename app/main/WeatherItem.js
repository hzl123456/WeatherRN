import React, {Component, PropTypes} from 'react'
import {Image} from 'react-native'
import {View, Text, List} from 'native-base'
import {TITLE_COLOR, GetWeatherImage} from '../const/WeatherConst'

export  default  class WeatherItem extends Component {

    static  propTypes = {
        weather: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {dataSource: this._initArray()}
    }

    _initArray = () => {
        let set = new Set();
        let items = this.props.weather.daily;
        let number = items.length > 7 ? 7 : items.length
        for (let i = 0; i < number; i++) {
            set.add(items[i])
        }
        return Array.from(set);
    }

    render() {
        return (
            <View style={{flexDirection: 'row', marginTop: 10}}>
                {this._getRenderItem()}
            </View>
        );
    }

    _getRenderItem() {
        let array = new Array();
        for (let i = 0; i < this.state.dataSource.length; i++) {
            array.push(<ItemInfo key={i} item={this.state.dataSource[i]}/>)
        }
        return array;
    }
}

class ItemInfo extends Component {

    static  propTypes = {
        item: PropTypes.object
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{color: TITLE_COLOR}}>{this.props.item.week.replace('星期', '周')}</Text>
                <Image source={this._getWeatherImage()}/>
            </View >
        )
    }

    _getWeatherImage = () => {
        let str = this.props.item.day.weather
        return GetWeatherImage(str)
    }
}