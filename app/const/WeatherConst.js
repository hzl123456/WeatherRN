import {Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';

export const API_KEY = "7c2dfb674b5a73d2ccf204c69a4ed44a"
export const BASE_URL = "http://apis.baidu.com/netpopo/weather/query"
export const MENU_WIDTH = 200
export const MENU_IMG_HEIGHT = 130
export const TEXT_COLOR = '#333'
export const TEXT_GREY_COLOR = '#575757'
export const TITLE_COLOR = '#3cb775'
export const BG_GREY = '#eee'
export const PRESS_COLOR = "#BDBDBD"
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const BAIDU_KEY = 'EvlFg0dEAg1aQ9rWA8jWKK9v7hwxScRe'

//表示进行城市的更新，一般删除城市和添加城市以后会回调
export const CITYS_REFRESH = "refresh"

export function GetWeatherImage(str) {
    //如果是 xx-xx的就取前面那个，如果小雨-中雨
    if (str.concat("-")) {
        str = str.split("-")[0];
    }
    switch (str) {
        case "晴":
            return require('../resource/drawable2x/day0@2x.png');
        case "多云":
            return require('../resource/drawable2x/day1@2x.png');
        case "阴":
            return require('../resource/drawable2x/day2@2x.png');
        case "阵雨":
            return require('../resource/drawable2x/day3@2x.png');
        case "雷阵雨":
            return require('../resource/drawable2x/day4@2x.png');
        case "小雨":
            return require('../resource/drawable2x/day6@2x.png');
        case "中雨":
            return require('../resource/drawable2x/day8@2x.png');
        case "大雨":
            return require('../resource/drawable2x/day9@2x.png');
        case "暴雨":
            return require('../resource/drawable2x/day11@2x.png');
        case "雨夹雪":
            return require('../resource/drawable2x/day13@2x.png');
        case "小雪":
            return require('../resource/drawable2x/day14@2x.png');
        case "中雪":
            return require('../resource/drawable2x/day15@2x.png');
        case "大雪":
            return require('../resource/drawable2x/day17@2x.png');
        case "雾":
            return require('../resource/drawable2x/day18@2x.png');
        case "霜冻":
            return require('../resource/drawable2x/day20@2x.png');
        default:
            return require('../resource/drawable2x/day0@2x.png');
    }
}

export function ShowToast(message) {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
}