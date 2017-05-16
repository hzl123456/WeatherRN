import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import TempItem from "./TempItem";
import AqiItem from "./AqiItem";
import ViewPager from 'react-native-viewpager';

const dataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});

export  default  class ChildScrollView extends Component {

    static propTypes = {
        weather: PropTypes.object,
        hasTouch: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{height: 260, flex: 1}}>
                <ViewPager
                    hasTouch={(hasTouch) => this.props.hasTouch&&this.props.hasTouch(hasTouch)}
                    renderPageIndicator={false}
                    ref="viewpager"
                    enableEmptySectio
                    isLoop={false}
                    autoPlay={false}
                    dataSource={dataSource.cloneWithPages(['temp', 'aqi'])}
                    renderPage={this._renderPage}/>
            </View>
        )
    }

    _renderPage = (item, page) => {
        if (page == 0) {
            return <TempItem weather={this.props.weather}/>
        } else {
            return <AqiItem weather={this.props.weather}/>
        }
    }

}