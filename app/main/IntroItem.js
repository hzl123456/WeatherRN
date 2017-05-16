import React, {Component, PropTypes} from 'react'
import {Image, Text, View} from 'react-native'
import {TITLE_COLOR} from '../const/WeatherConst'

const images = [
    require('../resource/drawable2x/ic_lifeindex_default@2x.png'),
    require('../resource/drawable2x/ic_lifeindex_sport@2x.png'),
    require('../resource/drawable2x/ic_lifeindex_default@2x.png'),
    require('../resource/drawable2x/ic_lifeindex_default@2x.png'),
    require('../resource/drawable2x/ic_lifeindex_carwash@2x.png'),
    require('../resource/drawable2x/ic_lifeindex_sport@2x.png'),
    require('../resource/drawable2x/ic_lifeindex_dress@2x.png')];

export  default class IntroItem extends Component {

    static propTypes = {
        weather: PropTypes.object
    }

    render() {
        return (
            <View>
                <ItemView item={this.props.weather.index[0]} showDetail={true} image={images[0]}/>
                <View style={{flexDirection: 'row'}}>
                    <ItemView item={this.props.weather.index[1]} showDetail={false} image={images[1]}/>
                    <ItemView item={this.props.weather.index[2]} showDetail={false} image={images[2]}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ItemView item={this.props.weather.index[3]} showDetail={false} image={images[3]}/>
                    <ItemView item={this.props.weather.index[4]} showDetail={false} image={images[4]}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ItemView item={this.props.weather.index[5]} showDetail={false} image={images[5]}/>
                    <ItemView item={this.props.weather.index[6]} showDetail={false} image={images[6]}/>
                </View>
            </View>
        )
    }
}


class ItemView extends Component {

    static propTypes = {
        item: PropTypes.object,
        image: PropTypes.number,
        showDetail: PropTypes.bool
    }

    render() {
        return (
            <View style={{flexDirection: 'row', padding: 12, flex: 1}}>
                <View style={{marginRight: 5, backgroundColor: TITLE_COLOR, alignItems: 'center', borderRadius: 20}}>
                    <Image source={this.props.image}/>
                </View>
                <View >
                    <Text
                        numberOfLines={1}
                        style={{color: TITLE_COLOR, fontSize: 15}}>{this.props.item.iname}</Text>
                    <Text
                        numberOfLines={1}
                        style={{color: TITLE_COLOR, marginTop: 3}}>
                        {this.props.showDetail ? this.props.item.detail : this.props.item.ivalue}
                    </Text>
                </View>
            </View>
        )
    }
}


