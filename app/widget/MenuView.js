import React, {Component, PropTypes} from 'react';
import {Image} from 'react-native'
import {Text, View} from 'native-base';
import {PRESS_COLOR, TEXT_COLOR} from '../const/WeatherConst'
import TouchableItem from "../widget/TouchableItem";

export  default  class MenuItem extends Component {

    static propTypes = {
        text: PropTypes.string,
        icon: PropTypes.number,
        onPress: PropTypes.func
    }

    render() {
        return (
            <TouchableItem pressColor={PRESS_COLOR}
                           style={{marginTop: 10,}}
                           onPress={this.props.onPress}>
                <View
                    style={{
                        paddingLeft: 20,
                        padding: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                    <Image source={this.props.icon}/>
                    <Text style={{color: TEXT_COLOR, paddingLeft: 15}}>{this.props.text}</Text>
                </View>
            </TouchableItem>
        );
    }
}