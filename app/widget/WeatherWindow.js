import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-native'
import {List, Text, View} from 'native-base'
import {Image, TouchableWithoutFeedback} from 'react-native'
import {TEXT_GREY_COLOR, GetWeatherImage, SCREEN_WIDTH, SCREEN_HEIGHT} from  '../const/WeatherConst'

export default  class WeatherWindow extends Component {

    static propTypes = {
        hourlyInfo: PropTypes.array,
        modalVisible: PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.state = {
            hourlyInfo: [],
            modalVisible: this.props.modalVisible
        }
    }

    _getHourlyTime = (item, position) => {
        //这边需要计算时间
        let time = item.time.split(":")[0];
        //当不是第一项的时候，而且为0，那么就表示是第二天了
        if (position > 0 && time === '0') {
            time = "明日" + time + "时";
        } else {
            time += "时";
        }
        console.log(time)
        return time;
    }

    _showModel = () => {
        this.setState({modalVisible: true})
    }

    _hideModel = () => {
        this.setState({modalVisible: false})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                    onRequestClose={() => {
                    }}
                    ref="modal"
                    animationType={"slide"}
                    transparent={true}
                    style={{flex: 1}}
                    visible={this.state.modalVisible}>
                    <View style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <Text style={{height: 200}}
                              onPress={() => this._hideModel() }/>
                        <List
                            style={{backgroundColor: '#fff'}}
                            enableEmptySections
                            dataArray={this.props.hourlyInfo}
                            renderRow={this._renderRowView}/>
                    </View>
                </Modal>
            </View>
        );
    }

    _renderRowView = (item, sectionID, position) => {
        return (
            <View style={{
                flexDirection: 'row',
                paddingTop: 7,
                paddingBottom: 7,
            }}>
                <View style={{flex: 1}}>
                    <View style={{alignItems: 'flex-end', width: 100}}>
                        <Text style={{color: TEXT_GREY_COLOR}}>{this._getWeatherTime(item, sectionID, position)}</Text>
                    </View>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: TEXT_GREY_COLOR}}>{item.temp + '°'}</Text>
                </View>

                <View style={{flex: 1, alignItems: "center", justifyContent: 'flex-end'}}>
                    <View style={{width: 100, flexDirection: 'row'}}>
                        <Image source={GetWeatherImage(item.weather)}/>

                        <Text style={{marginLeft: 3, color: TEXT_GREY_COLOR}}> {item.weather}</Text>
                    </View>
                </View>
            </View>)
    }

    _getWeatherTime = (item, sectionID, position) => {
        let time = item.time.split(":")[0];
        //当不是第一项的时候，而且为0，那么就表示是第二天了
        if (position != 0 && time == 0) {
            time = "明日" + time + "时";
        } else {
            time += "时";
        }
        return time;
    }
}
