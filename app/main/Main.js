import React, {Component} from 'react';
import {Container} from 'native-base'
import {UIManager, Share, View}  from 'react-native'
import {Platform} from 'react-native'
import Drawer from 'react-native-drawer';
import SideBar from '../menu/LeftMenu';
import TitleItem from '../widget/TitleView'
import MainSceen from '../main/MainScreen'
import {SCREEN_WIDTH, MENU_WIDTH, ShowToast, TITLE_COLOR} from '../const/WeatherConst'
import CameraRoll from 'rn-camera-roll';
import ScreenShot from '../util/ScreenShot'

export default class Main extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'refresh') {//表示要进行刷新
            //点击这个让其更新,通过修改全局变量起到更新的效果
            needLoad = true;
            this.setState({showPage: -1})
        }
    }

    constructor(props) {
        super(props);
        this.state = {title: "Weather", showPage: 0};
    }

    _drawerOpen = () => {
        this._drawer.open();
    }

    _drawerClose = () => {
        this._drawer.close();
    }

    //截取屏幕并保存本地，然后进行分享
    _takeScreenshot = () => {
        if (Platform.OS === 'ios') {
            UIManager
                .takeSnapshot('window', {format: 'png', quality: 0.9}) // See UIManager.js for options
                .then((uri) => {
                    // 先进行保存
                    CameraRoll.saveToCameraRoll(uri, 'photo')
                    //然后进行分享
                    this._shareImageFile(uri)
                })
                .catch((error) => {
                    ShowToast('分享截图失败');
                });
        } else {
            ScreenShot
                .takeScreenShot()
                .then((uri) => {
                    //TODO 这边进行弹窗的隐藏
                })
                .catch((status, message) => {
                    ShowToast('分享截图失败')
                })
        }
    }

    _shareImageFile = (uri) => {
        Share.share({url: uri, title: '分享天气截图'})
            .then(this._showResult).catch((error) => {
            ShowToast('分享截图失败')
        });
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            ShowToast('分享截图成功')
        } else if (result.action === Share.dismissedAction) {
            ShowToast('分享截图取消')
        }
    }

    render() {
        return (
            <Container >
                <TitleItem
                    rightClick={() => this._takeScreenshot()}
                    leftClick={() => this._drawerOpen()}
                    leftIcon={require('../resource/drawable3x/ic_menu@3x.png')}
                    title={this.state.title}
                    rightIcon={require('../resource/drawable3x/share_icon@3x.png')}
                    content={
                        <Drawer
                            type="overlay"
                            ref={(ref) => this._drawer = ref}
                            tapToClose={true}
                            openDrawerOffset={SCREEN_WIDTH - MENU_WIDTH}
                            styles={drawerStyles}
                            tweenHandler={(ratio) => ({
                                main: {opacity: (2 - ratio) / 2},
                            })}
                            content={<SideBar callbackParent={() => this._drawerClose()}/>}>

                            <MainSceen
                                showPage={this.state.showPage}
                                callbackParent={(title) => {
                                    if (title != this.state.title) {
                                        this.setState({title: title})
                                    }
                                }}/>
                        </Drawer>
                    }/>
            </Container>
        );
    }
}

const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
}

