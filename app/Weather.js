/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import '../app/const/DbConst'

import Main from './main/Main'
import Typhone from '../app/typhone/Typhone'
import AboutUs from '../app/aboutus/AboutUs'
import Settings from '../app/setting/Settings'
import AddCity from '../app/city/AddCity'
import ManagerCity from '../app/city/ManagerCity'

export default class App extends Component {
    render() {
        return (
            <Router hideNavBar="true">
                <Scene key="root">
                    <Scene key="Welcome" component={Main} initial={true}/>
                    <Scene key="Typhone" component={Typhone}/>
                    <Scene key="AboutUs" component={AboutUs}/>
                    <Scene key="Settings" component={Settings}/>
                    <Scene key="AddCity" component={AddCity}/>
                    <Scene key="ManagerCity" component={ManagerCity}/>
                </Scene>
            </Router>
        );
    }
}

