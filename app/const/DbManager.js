//保存城市信息
export function SaveChooseCity(info) {
    storage.save({
        key: chooseCity,  // 注意:请不要在key中使用_下划线符号!
        id: info.cityInfo.city_id, //把city_id作为id，因为他是唯一的
        rawData: info //里面是保存的数据
    });
}

//删除城市信息
export function DeleteChooseCity(info) {
    storage.remove({
        key: chooseCity,
        id: info.cityInfo.city_id
    });
}

//删除所有城市信息
export function DeleteAllChooseCity() {
    storage.clearMapForKey(chooseCity);
}

//保存是否通知的信息
export function SaveNotificationState(show) {
    storage.save({
        key: noti,  // 注意:请不要在key中使用_下划线符号!
        rawData: show //里面是保存的数据
    });
}

//保存是是否自动更新的信息
export function SaveUpdateState(show) {
    storage.save({
        key: update,  // 注意:请不要在key中使用_下划线符号!
        rawData: show //里面是保存的数据
    });
}
