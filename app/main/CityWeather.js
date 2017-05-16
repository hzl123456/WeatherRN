import React, {Component, PropTypes} from 'react';
import {RefreshControl, Alert, ScrollView, Platform, NativeModules} from 'react-native'
import {View} from 'native-base';
import {PRESS_COLOR, TITLE_COLOR, SCREEN_WIDTH} from '../const/WeatherConst'
import {SaveChooseCity} from '../const/DbManager'
import WeatherItem from './WeatherItem'
import IntroItem from './IntroItem'
import BrokenItem from '../widget/BrokenView'
import {ShowWeatherNotification} from '../util/NotificationUtil'
import ChildTempView from '../main/ChildScrollView'

export default class CityWeather extends Component {

    static propTypes = {
        chooseCityInfo: PropTypes.object,
        callbackParent: PropTypes.func,
        hasTouch: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            chooseCityInfo: this.props.chooseCityInfo,
            isRefreshing: false
        }
    }

    componentWillMount() {
        this._onRefresh()
    }

    render() {
        return (
            <View style={{
                flex: 1,
                margin: 7,
                borderRadius: 4,
                borderColor: PRESS_COLOR,
                backgroundColor: '#fff',
                borderWidth: 0.5
            }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={[TITLE_COLOR]}
                            progressBackgroundColor='#fff'/>}>
                    <View>
                        {this._renderRowView(this.state.chooseCityInfo)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _showNotification = (item) => {
        //判断数据库中是否含有该城市信息
        storage.load({
            key: noti
        }).then(isShow => {
            // 如果找到数据，就没啥事情了,就进行值的判断
            if (isShow && item.isChooseCity && item.weatherInfo != null) {//这个时候要进行notification的显示
                ShowWeatherNotification(item)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    _renderRowView = (item) => {
        if (item.weatherInfo != null && item.weatherInfo !== '') {
            //当为当前城市的时候并且是需要提示的时候就进行显示,这边的是不一样的
            if (Platform.OS === 'android') {
                this._showNotification(item)
            }
            return (
                <View>

                    <ChildTempView
                        hasTouch={(hasTouch) => this.props.hasTouch && this.props.hasTouch(hasTouch)}
                        weather={item.weatherInfo}/>

                    <WeatherItem weather={item.weatherInfo}/>

                    <BrokenItem
                        leftRightPadding={25}
                        topBottomPadding={15}
                        textDown={false}
                        mHeight={50}
                        mWidth={SCREEN_WIDTH - 14}
                        strokeWidth={2}
                        dataSource={this._getHighTempDataSource(item)}/>

                    <BrokenItem
                        leftRightPadding={25}
                        topBottomPadding={15}
                        textDown={true}
                        mHeight={50}
                        mWidth={SCREEN_WIDTH - 14}
                        strokeWidth={2}
                        dataSource={this._getLowTempDataSource(item)}/>

                    <IntroItem weather={item.weatherInfo}/>
                </View>)
        }
    }

    _getHighTempDataSource = (item) => {
        let daily = item.weatherInfo.daily;
        let array = new Array();
        let number = daily.length > 7 ? 7 : daily.length;
        for (let i = 0; i < number; i++) {
            array.push(Number.parseInt(daily[i].day.temphigh));
        }
        return array;
    }

    _getLowTempDataSource = (item) => {
        let daily = item.weatherInfo.daily;
        let array = new Array();
        let number = daily.length > 7 ? 7 : daily.length;
        for (let i = 0; i < number; i++) {
            array.push(Number.parseInt(daily[i].night.templow));
        }
        return array;
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true})
        //得到chooseCityInfo对象
        let chooseCityInfo = this.state.chooseCityInfo;
        fetch(baseUrl + "?citycode=" + chooseCityInfo.cityInfo.city_id, {
            method: 'GET',
            headers: {'apikey': apiKey},
        }).then((response) => {
            return response.json()
        }).then((responseData) => {
            //这边需要进行信息的判断
            if (responseData.status == '0') {//表示数据返回正常
                this._saveCityInfo(chooseCityInfo, responseData.result)
            } else {// 数据返回失败，需要重新提示，操作为删除该城市
                this._deleteCityInfo(chooseCityInfo, responseData.msg);
            }
        }).then(() => {
            this.setState({isRefreshing: false})
        })
    }

    _saveCityInfo = (chooseCityInfo, weatherInfo) => {
        //更新天气信息
        chooseCityInfo.weatherInfo = weatherInfo
        //保存信息到数据库中
        SaveChooseCity(chooseCityInfo);
        //进行json转化一遍，便于更新整个dom
        let newData = JSON.parse(JSON.stringify(chooseCityInfo))
        //更新state来进行数据的更新
        this.setState({chooseCityInfo: newData})
    }

    _deleteCityInfo = (chooseCityInfo, message) => {
        message = chooseCityInfo.cityName + message + ",确定删除当前城市信息？";
        Alert.alert(null, message,
            [
                {text: '取消'},
                {
                    text: '确认', onPress: () => this._deleteMainCityInfo(chooseCityInfo)
                },
            ])
    }

    _deleteMainCityInfo = (chooseCityInfo) => {
        this.props.callbackParent(chooseCityInfo)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.chooseCityInfo != this.props.chooseCityInfo ||
            nextState.chooseCityInfo != this.state.chooseCityInfo ||
            nextState.isRefreshing != this.state.isRefreshing
        )
    }
}






