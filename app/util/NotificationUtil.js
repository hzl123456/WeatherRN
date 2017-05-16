import Notification from './Notification'

export function ShowWeatherNotification(chooseCityInfo) {
    let weather = chooseCityInfo.weatherInfo;
    let city = chooseCityInfo.cityName;
    let temp = weather.temp + "°"
    let weatherDetail = weather.weather
    let updateTime = weather.updatetime.split(" ")[1] + "更新"

    Notification.showNotification(city,temp,weatherDetail,updateTime);
}