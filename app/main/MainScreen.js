import React, {Component, PropTypes} from 'react';
import {Platform, View} from 'react-native'
import CityWeather from "./CityWeather";
import ChooseCityInfo from '../pojo/ChooseCityInfo'
import {ShowToast, BAIDU_KEY} from '../const/WeatherConst'
import {SaveChooseCity, DeleteChooseCity} from '../const/DbManager'
import Location from '../util/LocationBaidu'
import ScrollableTabView  from  'react-native-scrollable-tab-view';

export default class Main extends Component {

    _getLocationUrl(latitude, longitude, key) {
        return `https://api.map.baidu.com/geocoder/v2/?callback=&location=${latitude},${longitude}&output=json&pois=1&ak=${key}`
    }

    async _locationIos() {
        navigator.geolocation.getCurrentPosition(
            location => {
                //得到了定位的经纬度
                let latitude = location.coords.latitude;
                let longitude = location.coords.longitude;
                //获取地址信息
                fetch(this._getLocationUrl(latitude, longitude, BAIDU_KEY), {method: 'get'})
                    .then((response) => {
                        return response.json()
                    })
                    .then((responseData) => {
                        if (responseData.status == 0) {//表示请求成功
                            let cityName = responseData.result.addressComponent.city;
                            this._lcoationCityInfo(cityName)
                        }
                    })
            },
            error => {
                console.error(error)
            }
        );
    }

    async _locationAndroid() {
        //定位获取当前定位城市信息,并且去除掉末尾的市字
        let city = await Location.startLocation();
        this._lcoationCityInfo(city);
    }

    async _lcoationCityInfo(cityName) {
        //去除掉末尾的市字
        let city = cityName.replace('市', '');
        //遍历得到数据信息
        let data = await require('../resource/assets/city.json');
        let jsonData = data.data
        let cityInfos = new Array();
        for (let i = 0; i < jsonData.length; i++) {
            for (let j = 0; j < jsonData[i].city.length; j++) {
                cityInfos.push(jsonData[i].city[j]);
            }
        }
        //从数据集合中获取信息集合
        let locationCity;
        for (let i = 0; i < cityInfos.length; i++) {
            if (cityInfos[i].city_child == city) {
                locationCity = cityInfos[i];
                break
            }
        }
        //判断数据库中是否含有该城市信息
        storage.load({
            key: chooseCity, id: locationCity.city_id
        }).then(ret => {
            // 如果找到数据，就没啥事情了
        }).catch(err => {
            // 如果没有找到数据那就添加到首位
            let info = new ChooseCityInfo();
            info.cityName = locationCity.city_child
            info.cityInfo = locationCity;
            //获取所有数量，当数量为0的时候设置为当前城市
            storage.getAllDataForKey(chooseCity).then(users => {
                if (users.length === 0) {
                    info.isChooseCity = true;
                }
                SaveChooseCity(info)
                //重新获取数据库信息并且更新
                this._getCityInfos()
            })
        })
    }

    static propTypes = {
        callbackParent: PropTypes.func,
        showPage: PropTypes.number  //-1 表示最后一页
    }

    //获取城市信息
    _getCityInfos = () => {
        storage.getAllDataForKey(chooseCity).then(infos => {
            //根据返回的showPage值进行选择
            //首先返回要显示的页码的城市的信息
            if (infos != null && infos.length > 0) {
                this.props.callbackParent(infos[this._showToPage(infos)].cityName)
            }
            //同时需要进行移动
            if (infos != null && infos.length > 0) {
                this.setState({
                    data: infos,
                });
                //进行页面的跳转
                this.refs.viewpager.goToPage(this._showToPage(infos))
            }
            needLoad = false;
        });
    }

    constructor(props) {
        super(props);
        this.state = ({
            isLocked: false,
            data: []
        })
        this._getCityInfos()
        if (Platform.OS === 'ios') {//android上使用百度地图定位，ios使用默认的定位然后使用百度的jsapi进行反地理编码
            this._locationIos()
        } else {
            this._locationAndroid()
        }
    }

    render() {
        return (
            <View style={ {flex: 1}}>
                {this.state.data.length > 0 ?
                    <ScrollableTabView
                        ref="viewpager"
                        locked={this.state.isLocked}
                        onChangeTab={(obj) => this._changePageTitle(obj)}
                        renderTabBar={() => <View style={{height: 0}}/>}>
                        {this._renderPage()}
                    </ScrollableTabView> : null}
            </View>
        );
    }

    //true表示内部需要滑动，此时外部需要lock住
    _hasTouch = (isTouch) => {
        this.setState({isLocked: isTouch})
    }

    _renderPage = () => {
        let array = new Array();
        for (let i = 0; i < this.state.data.length; i++) {
            array.push(
                <CityWeather
                    key={i}
                    hasTouch={this._hasTouch}
                    callbackParent={(chooseCityInfo) => {
                        //删除该数据的信息，然后进行更新通知
                        DeleteChooseCity(chooseCityInfo)
                        //Toast弹窗通知删除成功
                        ShowToast(chooseCityInfo.cityName + '删除成功')
                        this._getCityInfos()
                    }}
                    chooseCityInfo={this.state.data[i]}/>)
        }
        return array;
    }

    _changePageTitle = (obj) => {
        let page = obj.i;
        if (page < 0 || page > this.state.data.length - 1) {
            return
        }
        this.props.callbackParent(this.state.data[page].cityName)
    }

    _showToPage = (infos) => {
        let showPage = this.props.showPage;
        let length = infos == null ? 0 : infos.length;
        //当为-1的时候需要重新去获取信息
        return (showPage == -1 ? (length == 0 ? 0 : length - 1) : showPage)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (needLoad && nextProps.showPage == -1) {//这个时候也需要进行更新,
            this._getCityInfos()
            return true;
        }
        return nextState.data != this.state.data || nextState.isLocked != this.state.isLocked;
    }
}


