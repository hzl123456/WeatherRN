import React, {Component} from  'react'
import TitleItem from '../widget/TitleView'
import SettingItem from '../setting/SettingItem'
import {CheckBox, View} from "native-base";
import  {SaveNotificationState, SaveUpdateState} from '../const/DbManager'
import {TITLE_COLOR} from '../const/WeatherConst'

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updateState: false,
            notificationState: false
        }
        this._getNotificationState()
        this._getUpdateState()
    }

    _getNotificationState = () => {
        storage.load({
            key: noti
        }).then(isShow => {
            this.setState({notificationState: isShow})
        }).catch(err => {
        })
    }

    _getUpdateState = () => {
        storage.load({
            key: update
        }).then(isShow => {
            this.setState({updateState: isShow})
        }).catch(err => {
        })
    }

    checkBoxState(position) {
        switch (position) {
            case 1: //自动更新
                this.setState((oldState) => {
                    //保存信息
                    let state = !oldState.updateState;
                    SaveUpdateState(state)
                    return {updateState: !oldState.updateState}
                })
                break
            case 2: //通知栏
                this.setState((oldState) => {
                    //保存信息
                    let state = !oldState.notificationState;
                    SaveNotificationState(state)
                    return {notificationState: state}
                })
                break
        }
    }

    render() {
        return (
            <TitleItem
                title="设置"
                content={
                    <View>
                        <SettingItem
                            onPress={() => this.checkBoxState(1)}
                            title="自动更新" content="开启可以自动更新天气信息"
                            show={<CheckBox
                                style={{borderRadius: 2}}
                                checked={this.state.updateState}
                                color={TITLE_COLOR}/>}/>

                        <SettingItem
                            title="更新时间间隔" content="1小时"/>

                        <SettingItem
                            onPress={() => this.checkBoxState(2)}
                            title="通知栏" content="开启通知栏，在通知栏显示天气信息"
                            show={<CheckBox style={{borderRadius: 2}}
                                            checked={this.state.notificationState}
                                            color={TITLE_COLOR}/>}/>

                        <SettingItem
                            itemDivider={false}
                            title="开发者" content="邮箱：mail@hezhilin.cc"/>
                    </View>
                }/>
        )
    }


}