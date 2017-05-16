package com.weatherrn;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.weatherrn.location.LocationModule;
import com.weatherrn.notification.NotificationModule;
import com.weatherrn.screen.ScreenShotModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 作者：请叫我百米冲刺 on 2017/4/18 上午10:05
 * 邮箱：mail@hezhilin.cc
 */

public class MainWeatherPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<>();
        list.add(new LocationModule(reactContext));
        list.add(new ScreenShotModule(reactContext));
        list.add(new NotificationModule(reactContext));
        return list;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
