import  React, {Component} from 'react'
import {Image, View} from 'react-native'
import {Container, Button, Text} from 'native-base'
import TitleItem from '../widget/TitleView'
import {TITLE_COLOR, TEXT_COLOR} from '../const/WeatherConst'

export  default class AboutUs extends Component {
    render() {
        return (
            <TitleItem title="关于Weather"
                       content={
                           <Container style={{alignItems: 'center'}}>
                               <Image
                                   style={{marginTop: 100}}
                                   source={require('../resource/drawable2x/ic_launcher@2x.png')}/>

                               <View
                                   style={{
                                       position: 'absolute',
                                       left: 30,
                                       right: 30,
                                       top: 250,
                                       alignItems: 'center',
                                       justifyContent: 'center',
                                       padding: 7,
                                       borderRadius: 5,
                                       backgroundColor: TITLE_COLOR
                                   }}>
                                   <Text style={{color: '#fff', fontSize: 16}}>当前版本:1.0.4</Text>
                               </View>

                               <Container style={{flex: 1, paddingBottom: 10, justifyContent: 'flex-end'}}>
                                   <Text style={{fontSize: 10, color: TEXT_COLOR}}>Weather是仿照一款叫做天气的软件制作的</Text>
                               </Container>
                           </Container>
                       }/>
        );
    }
}