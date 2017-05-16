import ViewPager from 'react-native-viewpager';
import React, {Component} from 'react'

export default class ChildViewPager extends Component {

    static propTypes = {
        ...ViewPager.props
    }

    render() {
        return (
            <ViewPager>

            </ViewPager>
        )
    }


}