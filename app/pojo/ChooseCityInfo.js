import CityInfo from './CityInfo'

export default class ChooseCityInfo {

    /**
     * 这边保存一个cityNmae，使用需要
     * **/
    cityName: string;

    /**
     * 是否为当前城市,默认为false
     **/
    isChooseCity: false;

    /**
     * 城市信息
     **/
    cityInfo: CityInfo;

    /**
     * 保存上一次的天气信息
     * 太长了，，不好写
     **/
    weatherInfo;

//      {
//         "city": "安顺",
//         "cityid": "111",
//         "citycode": "101260301",
//         "date": "2017-04-21",
//         "week": "星期五",
//         "weather": "阵雨",
//         "temp": "10",
//         "temphigh": "12",
//         "templow": "7",
//         "img": "3",
//         "humidity": "70",
//         "pressure": "1019",
//         "windspeed": "18.0",
//         "winddirect": "东北风",
//         "windpower": "5级",
//         "updatetime": "2017-04-21 14:35:06",
//         "index": [
//             {
//                 "iname": "空调指数",
//                 "ivalue": "较少开启",
//                 "detail": "您将感到很舒适，一般不需要开启空调。"
//             },
//             {
//                 "iname": "运动指数",
//                 "ivalue": "较不宜",
//                 "detail": "有降水，推荐您在室内进行各种健身休闲运动，若坚持户外运动，须注意保暖并携带雨具。"
//             },
//             {
//                 "iname": "紫外线指数",
//                 "ivalue": "最弱",
//                 "detail": "属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。"
//             },
//             {
//                 "iname": "感冒指数",
//                 "ivalue": "极易发",
//                 "detail": "将有一次强降温过程，天气寒冷，且空气湿度较大，极易发生感冒，请特别注意增加衣服保暖防寒。"
//             },
//             {
//                 "iname": "洗车指数",
//                 "ivalue": "不宜",
//                 "detail": "不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"
//             },
//             {
//                 "iname": "空气污染扩散指数",
//                 "index": "良",
//                 "detail": "气象条件有利于空气污染物稀释、扩散和清除，可在室外正常活动。"
//             },
//             {
//                 "iname": "穿衣指数",
//                 "ivalue": "较冷",
//                 "detail": "建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。"
//             }
//             ],
//         "aqi": {
//             "so2": "10",
//             "so224": "10",
//             "no2": "8",
//             "no224": "10",
//             "co": "0.330",
//             "co24": "0.450",
//             "o3": "112",
//             "o38": "86",
//             "o324": "86",
//             "pm10": "17",
//             "pm1024": "42",
//             "pm2_5": "8",
//             "pm2_524": "21",
//             "iso2": "4",
//             "ino2": "4",
//             "ico": "4",
//             "io3": "36",
//             "io38": "44",
//             "ipm10": "17",
//             "ipm2_5": "11",
//             "aqi": "44",
//             "primarypollutant": "O3",
//             "quality": "优",
//             "timepoint": "2017-04-21 14:00:00",
//             "aqiinfo": {
//                 "level": "一级",
//                 "color": "#00e400",
//                 "affect": "空气质量令人满意，基本无空气污染",
//                 "measure": "各类人群可正常活动"
//             }
//         },
//         "daily": [
//             {
//                 "date": "2017-04-21",
//                 "week": "星期五",
//                 "sunrise": "06:28",
//                 "sunset": "19:24",
//                 "night": {
//                     "weather": "雷阵雨",
//                     "templow": "7",
//                     "img": "4",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 },
//                 "day": {
//                     "weather": "阵雨",
//                     "temphigh": "12",
//                     "img": "3",
//                     "winddirect": "北风",
//                     "windpower": "微风"
//                 }
//             },
//             {
//                 "date": "2017-04-22",
//                 "week": "星期六",
//                 "sunrise": "06:27",
//                 "sunset": "19:24",
//                 "night": {
//                     "weather": "阴",
//                     "templow": "9",
//                     "img": "2",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 },
//                 "day": {
//                     "weather": "多云",
//                     "temphigh": "17",
//                     "img": "1",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 }
//             },
//             {
//                 "date": "2017-04-23",
//                 "week": "星期日",
//                 "sunrise": "06:26",
//                 "sunset": "19:25",
//                 "night": {
//                     "weather": "阴",
//                     "templow": "10",
//                     "img": "2",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 },
//                 "day": {
//                     "weather": "多云",
//                     "temphigh": "15",
//                     "img": "1",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 }
//             },
//             {
//                 "date": "2017-04-24",
//                 "week": "星期一",
//                 "sunrise": "06:26",
//                 "sunset": "19:25",
//                 "night": {
//                     "weather": "雷阵雨",
//                     "templow": "13",
//                     "img": "4",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 },
//                 "day": {
//                     "weather": "多云",
//                     "temphigh": "18",
//                     "img": "1",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 }
//             },
//             {
//                 "date": "2017-04-25",
//                 "week": "星期二",
//                 "sunrise": "06:25",
//                 "sunset": "19:26",
//                 "night": {
//                     "weather": "小雨",
//                     "templow": "12",
//                     "img": "7",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 },
//                 "day": {
//                     "weather": "阵雨",
//                     "temphigh": "19",
//                     "img": "3",
//                     "winddirect": "无持续风向",
//                     "windpower": "微风"
//                 }
//             },
//             {
//                 "date": "2017-04-26",
//                 "week": "星期三",
//                 "sunrise": "07:30",
//                 "sunset": "19:30",
//                 "night": {
//                     "weather": "阵雨",
//                     "templow": "10",
//                     "img": "3",
//                     "winddirect": "东北风",
//                     "windpower": "微风"
//                 },
//                 "day": {
//                     "weather": "阵雨",
//                     "temphigh": "16",
//                     "img": "3",
//                     "winddirect": "东北风",
//                     "windpower": "微风"
//                 }
//             },
//             {
//                 "date": "2017-04-27",
//                 "week": "星期四",
//                 "sunrise": "07:30",
//                 "sunset": "19:30",
//                 "night": {
//                     "weather": "阵雨",
//                     "templow": "9",
//                     "img": "3",
//                     "winddirect": "",
//                     "windpower": "微风"
//                 },
//                 "day": {
//                     "weather": "阵雨",
//                     "temphigh": "14",
//                     "img": "3",
//                     "winddirect": "",
//                     "windpower": "微风"
//                 }
//             }
//             ],
//         "hourly": [
//             {
//                 "time": "16:00",
//                 "weather": "阴",
//                 "temp": "11",
//                 "img": "2"
//             },
//             {
//                 "time": "17:00",
//                 "weather": "阴",
//                 "temp": "11",
//                 "img": "2"
//             },
//             {
//                 "time": "18:00",
//                 "weather": "阴",
//                 "temp": "12",
//                 "img": "2"
//             },
//             {
//                 "time": "19:00",
//                 "weather": "阴",
//                 "temp": "12",
//                 "img": "2"
//             },
//             {
//                 "time": "20:00",
//                 "weather": "阴",
//                 "temp": "12",
//                 "img": "2"
//             },
//             {
//                 "time": "21:00",
//                 "weather": "阴",
//                 "temp": "11",
//                 "img": "2"
//             },
//             {
//                 "time": "22:00",
//                 "weather": "阴",
//                 "temp": "10",
//                 "img": "2"
//             },
//             {
//                 "time": "23:00",
//                 "weather": "阵雨",
//                 "temp": "9",
//                 "img": "3"
//             },
//             {
//                 "time": "0:00",
//                 "weather": "阵雨",
//                 "temp": "9",
//                 "img": "3"
//             },
//             {
//                 "time": "1:00",
//                 "weather": "阵雨",
//                 "temp": "9",
//                 "img": "3"
//             },
//             {
//                 "time": "2:00",
//                 "weather": "阵雨",
//                 "temp": "9",
//                 "img": "3"
//             },
//             {
//                 "time": "3:00",
//                 "weather": "阵雨",
//                 "temp": "8",
//                 "img": "3"
//             },
//             {
//                 "time": "4:00",
//                 "weather": "阵雨",
//                 "temp": "8",
//                 "img": "3"
//             },
//             {
//                 "time": "5:00",
//                 "weather": "阴",
//                 "temp": "8",
//                 "img": "2"
//             },
//             {
//                 "time": "6:00",
//                 "weather": "多云",
//                 "temp": "8",
//                 "img": "1"
//             },
//             {
//                 "time": "7:00",
//                 "weather": "多云",
//                 "temp": "8",
//                 "img": "1"
//             },
//             {
//                 "time": "8:00",
//                 "weather": "多云",
//                 "temp": "9",
//                 "img": "1"
//             },
//             {
//                 "time": "9:00",
//                 "weather": "多云",
//                 "temp": "11",
//                 "img": "1"
//             },
//             {
//                 "time": "10:00",
//                 "weather": "多云",
//                 "temp": "12",
//                 "img": "1"
//             },
//             {
//                 "time": "11:00",
//                 "weather": "多云",
//                 "temp": "14",
//                 "img": "1"
//             },
//             {
//                 "time": "12:00",
//                 "weather": "多云",
//                 "temp": "16",
//                 "img": "1"
//             },
//             {
//                 "time": "13:00",
//                 "weather": "多云",
//                 "temp": "17",
//                 "img": "1"
//             },
//             {
//                 "time": "14:00",
//                 "weather": "多云",
//                 "temp": "17",
//                 "img": "1"
//             },
//             {
//                 "time": "15:00",
//                 "weather": "多云",
//                 "temp": "18",
//                 "img": "1"
//             }
//     }
}