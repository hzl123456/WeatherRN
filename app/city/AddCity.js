import React, {Component} from 'react'
import {Alert, SectionList, StyleSheet, Platform} from 'react-native'
import {Text, View} from 'native-base'
import TitleItem from '../widget/TitleView'
import {TITLE_COLOR, BG_GREY, PRESS_COLOR, CITYS_REFRESH} from '../const/WeatherConst'
import TouchableItem from '../widget/TouchableItem';
import ChooseCityInfo from '../pojo/ChooseCityInfo'
import CityInfo from '../pojo/CityInfo'
import {SaveChooseCity} from '../const/DbManager'
import {Actions} from 'react-native-router-flux';
import CitySectionList from './CitySectionList'

const ITEM_HEIGHT = 50;
const HEADER_HEIGHT = 24;
const SEPARATOR_HEIGHT = 0;

export  default  class AddCity extends Component {

    async getCityInfos() {
        let data = await require('../resource/assets/city.json');
        let jsonData = data.data
        //项目
        let totalSize = 0;

        let cityInfos = [];
        let citySection = [];
        let citySectionSize = [];

        for (let i = 0; i < jsonData.length; i++) {
            citySectionSize[i] = totalSize;
            //给右侧的滚动条进行使用的
            citySection[i] = jsonData[i].title;
            let section = {}
            section.key = jsonData[i].title;
            section.data = jsonData[i].city;
            for (let j = 0; j < section.data.length; j++) {
                section.data[j].key = j
            }
            cityInfos[i] = section;
            //每一项的header的index
            totalSize += section.data.length + 1
        }
        this.setState({data: cityInfos, sections: citySection, sectionSize: citySectionSize})
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sections: [],
            sectionSize: []
        }
        this.getCityInfos()
    }

    render() {
        return (
            <TitleItem
                title="城市列表"
                content={
                    this.state.data.length > 0 ?
                        <View>
                            <SectionList
                                ref='list'
                                renderItem={this._renderItem}
                                renderSectionHeader={this._renderSectionHeader}
                                sections={this.state.data}
                                getItemLayout={this._getItemLayout}/>

                            <CitySectionList
                                sections={ this.state.sections}
                                onSectionSelect={this._onSectionselect}/>
                        </View> : null
                }
            />
        )
    }

    //这边返回的是A,0这样的数据
    _onSectionselect = (section, index) => {
        //跳转到某一项
        this.refs.list.scrollToIndex({animated: true, index: this.state.sectionSize[index]})
    }

    _getItemLayout(data, index) {
        let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
        return {length, offset: (length + separator) * index + header, index};
    }

    _renderItem = (item) => {
        return (
            <TouchableItem
                pressColor={PRESS_COLOR}
                onPress={() => {
                    let message = "确定添加 " + item.item.city_child + " 的城市信息？";
                    Alert.alert(null, message,
                        [
                            {text: '取消'},
                            {text: '确认', onPress: () => saveChooseCityInfo(item.item)},
                        ])
                }}>
                <View style={{
                    flexDirection: 'row',
                    padding: 12,
                    alignItems: 'center',
                    height: ITEM_HEIGHT
                }}>
                    <Text style={{marginLeft: 30, fontSize: 16, color: '#333'}}>
                        {item.item.city_child}
                    </Text>
                    <Text style={{marginLeft: 25, fontSize: 15, color: '#999'}}>
                        {item.item.city_parent}
                    </Text>
                    <Text style={{marginLeft: 25, fontSize: 13, color: '#999'}}>
                        {item.item.provcn}
                    </Text>
                </View>
            </TouchableItem>
        )
    }

    _renderSectionHeader = (section) => {
        return (
            <View style={{
                justifyContent: 'center',
                height: HEADER_HEIGHT,
                paddingLeft: 20,
                backgroundColor: BG_GREY
            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: TITLE_COLOR
                }}>{section.section.key}</Text>
            </View>
        )
    }
}

//将要添加的城市信息保存到数据库中
function saveChooseCityInfo(cityInfo: CityInfo) {
    let info = new ChooseCityInfo();
    //设置城市信息
    info.cityName = cityInfo.city_child;
    info.cityInfo = cityInfo;

    //获取所有数量，当数量为0的时候设置为当前城市
    storage.getAllDataForKey(chooseCity).then(users => {
        if (users.length === 0) {
            info.isChooseCity = true;
        }
        SaveChooseCity(info)
        goToMainView()
    })
}

function goToMainView() {
    //跳转到主页面进行数据的更新
    Actions.pop({refresh: {type: CITYS_REFRESH}})
}

const styles = StyleSheet.create({

    headerView: {
        justifyContent: 'center',
        height: HEADER_HEIGHT,
        paddingLeft: 20,
        backgroundColor: BG_GREY
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: TITLE_COLOR
    },
    itemView: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: ITEM_HEIGHT
    }
});

