package com.weatherrn.screen;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Environment;
import android.view.View;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 作者：请叫我百米冲刺 on 2017/5/2 下午5:16
 * 邮箱：mail@hezhilin.cc
 */

public class ScreenShotModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "ScreenShot";

    public ScreenShotModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * 进行截取屏幕
     *
     * @return bitmap
     */
    private Bitmap takeScreenShot() {
        Bitmap bitmap = null;
        Activity pActivity = getCurrentActivity();
        View view = pActivity.getWindow().getDecorView();
        // 设置是否可以进行绘图缓存
        view.setDrawingCacheEnabled(true);
        // 如果绘图缓存无法，强制构建绘图缓存
        view.buildDrawingCache();
        // 返回这个缓存视图
        bitmap = view.getDrawingCache();

        // 获取状态栏高度
        Rect frame = new Rect();
        // 测量屏幕宽和高
        view.getWindowVisibleDisplayFrame(frame);

        int width = view.getWidth() == 0 ? pActivity.getWindowManager().getDefaultDisplay().getWidth() : view.getWidth();
        int height = view.getHeight() == 0 ? pActivity.getWindowManager().getDefaultDisplay().getHeight() : view.getHeight();
        // 根据坐标点和需要的宽和高创建bitmap,在这里保留状态栏
        bitmap = Bitmap.createBitmap(bitmap, 0, 0, width, height);
        // 销毁缓存信息
        view.destroyDrawingCache();
        view.setDrawingCacheEnabled(false);
        return bitmap;
    }

    /**
     * 保存图片到sdcard中
     *
     * @param pBitmap
     */
    private boolean savePic(Bitmap pBitmap, String strName) {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(strName);
            if (null != fos) {
                pBitmap.compress(Bitmap.CompressFormat.PNG, 90, fos);
                fos.flush();
                fos.close();
                return true;
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * @param promise 回调
     **/
    @ReactMethod
    public void takeScreenShot(final Promise promise) {
        final Activity ptActivity = getCurrentActivity();
        //图片的路径
        final String filePath = getSDCardPath() + File.separator + System.currentTimeMillis() + ".png";
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    //保存图片
                    savePic(takeScreenShot(), filePath);
                    //给回调，主要用于rn的弹窗的隐藏
                    promise.resolve(filePath);
                    //分享图片
                    Uri uri = Uri.parse("file://" + filePath);
                    Intent it = new Intent(Intent.ACTION_SEND);
                    it.putExtra(Intent.EXTRA_STREAM, uri);
                    it.setType("image/*");
                    ptActivity.startActivityForResult(Intent.createChooser(it, "分享现在的天气"), 10);
                } catch (Exception e) {
                    promise.reject("-1", "截图失败");
                }
            }
        }).start();
    }

    /**
     * 返回内存卡路径
     *
     * @return
     */
    public final String getSDCardPath() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }
}
