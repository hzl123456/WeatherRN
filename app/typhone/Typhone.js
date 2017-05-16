import React, {Component} from 'react';
import {WebView, Dimensions} from 'react-native'
import {Container} from 'native-base'
import TitleItem from '../widget/TitleView'

const url = "https://earth.nullschool.net/";

//获取设备的宽度和高度
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

export default class Typhone extends Component {

    render() {
        return (
            <Container>
                <TitleItem title="全球台风"
                           content={
                               <WebView bounces={false}
                                        automaticallyAdjustContentInsets={true}
                                        scalesPageToFit={true}
                                        startInLoadingState={true}
                                        source={{uri: url, method: 'GET'}}
                                        style={{width: deviceWidth, height: deviceHeight}}>
                               </WebView>
                           }/>
            </Container>
        );
    }
}