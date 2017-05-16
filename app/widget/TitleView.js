import React, {Component, PropTypes} from 'react';
import {Image} from 'react-native'
import {Container, Header, Icon, Title, Button, Left, Right, Body} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {TITLE_COLOR} from '../const/WeatherConst'

export  default class TitleItem extends Component {

    static propTypes = {
        leftIcon: PropTypes.number,
        leftClick: PropTypes.func,
        title: PropTypes.string,
        rightIcon: PropTypes.number,
        rightClick: PropTypes.func,
        content: PropTypes.object
    }


    static get defaultProps() {
        return {
            leftIcon: require('../resource/drawable3x/ic_white_back@3x.png'),
            leftClick: () => {
                Actions.pop();
            }
        }
    }


    render() {
        return (
            <Container>
                <Header
                    androidStatusBarColor={TITLE_COLOR}
                    style={{backgroundColor: TITLE_COLOR}}>
                    <Left>
                        <Button iconLeft transparent onPress={this.props.leftClick}>
                            <Image source={this.props.leftIcon}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{color: '#fff'}}>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button iconLeft transparent onPress={this.props.rightClick}>
                            <Image source={this.props.rightIcon}/>
                        </Button>
                    </Right>
                </Header>
                <Container>{this.props.content}</Container>
            </Container>
        );
    }
}