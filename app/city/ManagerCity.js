import React, {Component} from 'react'
import {List} from 'native-base'
import  {Alert} from 'react-native'
import {Actions} from 'react-native-router-flux';
import TitleItem from '../widget/TitleView'
import CityItem from '../city/CityItem'
import {ShowToast, CITYS_REFRESH} from '../const/WeatherConst'
import {SaveChooseCity, DeleteChooseCity} from '../const/DbManager'

export  default  class ManagerCity extends Component {

    //表示是否有进行删除，有删除的话就需要进行更新的操作
    hasDeleted = false;

    //获取城市信息
    getCityInfos() {
        storage.getAllDataForKey(chooseCity).then(infos => {
            if (infos.length > 0) {
                for (info of infos) {
                    if (info.isChooseCity) {
                        this.setState({chooseCity: infos, isChooseCity: info});
                        break;
                    }
                }
            }
        });
    }

    //点击了某一项将设置为当前城市
    _changeIsChooseCity(item) {
        if (item.cityName !== this.state.isChooseCity.cityName) {//判断是否为同一个
            //首先改变原来那个
            this.state.isChooseCity.isChooseCity = false;
            SaveChooseCity(this.state.isChooseCity);
            //改变新的
            item.isChooseCity = true;
            SaveChooseCity(item);
            //进行更新
            this.getCityInfos();
        }
    }

    _deleteChooseCity(item) {
        //首先判断是否我当前城市
        if (item.isChooseCity) {//弹窗提示
            //Toast弹窗通知无法删除
            ShowToast('当前城市无法被删除');
        } else {
            //删除该数据的信息，然后进行更新通知
            DeleteChooseCity(item)
            this.hasDeleted = true;
            //Toast弹窗通知删除成功
            ShowToast(item.cityName + '删除成功')
            this.getCityInfos()
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            chooseCity: [],  //列表数据
            hasChooseCity: null //当前选中的数据
        }
        this.getCityInfos();
    }

    _leftClick = () => {
        if (this.hasDeleted) {
            Actions.pop({refresh: {type: CITYS_REFRESH}})
        } else {
            Actions.pop()
        }
    }

    render() {
        return (<TitleItem
                leftClick={() => this._leftClick()}
                title="管理城市"
                content={
                    <List
                        enableEmptySections
                        dataArray={this.state.chooseCity}
                        renderRow={(item) =>
                            <CityItem
                                cityName={item.cityName}
                                isNowCity={item.isChooseCity}
                                temp={item.weatherInfo == null || item.weatherInfo === '' ? null : item.weatherInfo.temp + "°"}
                                weather={ item.weatherInfo == null || item.weatherInfo === '' ? null : item.weatherInfo.weather}
                                onPress={() => {
                                    let message = "确定设置 " + item.cityName + " 为当前城市？";
                                    Alert.alert(null, message,
                                        [
                                            {text: '取消'},
                                            {
                                                text: '确认', onPress: () => this._changeIsChooseCity(item)
                                            },
                                        ])
                                }
                                }
                                onLongPress={() => {
                                    let message = "确定删除 " + item.cityName + " 城市信息？";
                                    Alert.alert(null, message,
                                        [
                                            {text: '取消'},
                                            {
                                                text: '确认', onPress: () => this._deleteChooseCity(item)
                                            },
                                        ])
                                }
                                }
                            />}>
                    </List>
                }/>
        )
    }
}

