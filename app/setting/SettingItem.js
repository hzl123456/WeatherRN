import React, {Component, PropTypes} from 'react'
import {Text, View} from 'native-base'
import {TITLE_COLOR, TEXT_COLOR, PRESS_COLOR} from '../const/WeatherConst'
import TouchableItem from '../widget/TouchableItem';

export  default  class SettingItem extends Component {

    static  propTypes = {
        title: PropTypes.string,
        content: PropTypes.string,
        show: PropTypes.object,
        itemDivider: PropTypes.bool,
        onPress: PropTypes.func
    }

    static get defaultProps() {
        return {
            itemDivider: true
        }
    }

    render() {
        return (
            <TouchableItem pressColor={PRESS_COLOR} onPress={this.props.onPress}>
                <View >
                    <View>
                        <View style={{flexDirection: 'row', padding: 15}}>
                            <View>
                                <Text style={{color: TITLE_COLOR, fontSize: 15}}>{this.props.title}</Text>
                                <Text
                                    style={{color: TEXT_COLOR, fontSize: 14, marginTop: 3}}>{this.props.content}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                marginRight: 15
                            }}>
                                {this.props.show}
                            </View>
                        </View>
                        <View style={{height: this.props.itemDivider ? 0.3 : 0, backgroundColor: PRESS_COLOR}}/>
                    </View>
                </View>
            </TouchableItem>
        );
    }
}