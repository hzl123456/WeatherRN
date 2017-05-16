import React, {Component, PropTypes} from 'react';
import {Image} from 'react-native'
import {Container} from 'native-base';
import {MENU_WIDTH, MENU_IMG_HEIGHT} from '../const/WeatherConst'
import  MenuItem from '../widget/MenuView'
import {Actions} from 'react-native-router-flux';

const menuItems = ["全球台风", "添加城市", "管理城市", "设置", "关于"]
const drawableItems = [
    require('../resource/drawable2x/ic_typhone@2x.png'),
    require('../resource/drawable2x/ic_addcity@2x.png'),
    require('../resource/drawable2x/ic_manager_city@2x.png'),
    require('../resource/drawable2x/ic_settings@2x.png'),
    require('../resource/drawable2x/ic_about@2x.png')];

export  default  class LeftMenu extends Component {

    static propTypes = {
        //这边用于点击列表的回调
        callbackParent: PropTypes.func
    }

    menuItemAction(position) {
        switch (position) {
            case 0: //全球台风
                Actions.Typhone();
                break;
            case 1: //添加城市
                Actions.AddCity();
                break;
            case 2: //管理城市
                Actions.ManagerCity();
                break;
            case 3: //设置
                Actions.Settings();
                break;
            case 4: //关于
                Actions.AboutUs();
                break;
        }
        this.props.callbackParent();
    }

    render() {
        return (
            <Container
                back={this.props.back}
                style={{flex: 1, backgroundColor: '#fff', width: MENU_WIDTH}}>
                <Image
                    resizeMode='stretch'
                    style={{height: MENU_IMG_HEIGHT, width: MENU_WIDTH}}
                    source={require('../resource/drawable3x/icon_drawer@3x.png')}/>
                <MenuItem text={menuItems[0]} icon={drawableItems[0]} onPress={() => this.menuItemAction(0)}/>
                <MenuItem text={menuItems[1]} icon={drawableItems[1]} onPress={() => this.menuItemAction(1)}/>
                <MenuItem text={menuItems[2]} icon={drawableItems[2]} onPress={() => this.menuItemAction(2)}/>
                <MenuItem text={menuItems[3]} icon={drawableItems[3]} onPress={() => this.menuItemAction(3)}/>
                <MenuItem text={menuItems[4]} icon={drawableItems[4]} onPress={() => this.menuItemAction(4)}/>
            </Container>
        );
    }

    //这个页面永远都不需要进行修改
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
}