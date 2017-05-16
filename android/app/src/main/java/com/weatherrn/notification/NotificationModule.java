package com.weatherrn.notification;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.media.RingtoneManager;
import android.widget.RemoteViews;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.weatherrn.R;


/**
 * Created by Au61 on 2016/6/21.
 */
public class NotificationModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "Notification";


    private static final int NOTIFICATION_ID = 100;

    /**
     * 是否已经有通知栏了
     **/
    private static boolean hasNotification;


    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * 进行通知，不需要进行activity的跳转
     **/
    @ReactMethod
    public void showNotification(final String city, final String temp, final String weather, final String updateTime) {
        //当前城市而且发送通知的才有通知
        new Thread(new Runnable() {
            @Override
            public void run() {
                Context appliction = getReactApplicationContext();
                //自定义通知栏的布局，并且设置信息
                RemoteViews remoteViews = new RemoteViews(appliction.getPackageName(), R.layout.layout_notification);
                remoteViews.setTextViewText(R.id.tv_t_show, temp);
                remoteViews.setTextViewText(R.id.tv_city, city);
                remoteViews.setTextViewText(R.id.tv_weather, weather);
                remoteViews.setTextViewText(R.id.tv_time, updateTime);

                NotificationManager notificationManager = (NotificationManager) appliction.getSystemService(Context.NOTIFICATION_SERVICE);
                //创建通知
                Notification.Builder mBuilder = new Notification.Builder(appliction)
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContent(remoteViews)
                        .setAutoCancel(true);
                if (!hasNotification) {
                    mBuilder.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION));
                    hasNotification = true;
                }
                notificationManager.notify(NOTIFICATION_ID, mBuilder.build());
            }
        }).start();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }
}
