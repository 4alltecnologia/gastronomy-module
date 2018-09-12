package com.fourall.gastronomymodule;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.Intent;

public class GastronomyNative extends ReactContextBaseJavaModule {

    public GastronomyNative(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GastronomyNative";
    }

    @ReactMethod
    public void openNetworkSettings(Callback successCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
          successCallback.invoke(false);
          return;
        }

        try {
            currentActivity.startActivity(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS));
            successCallback.invoke(true);
        } catch (Exception e) {
            successCallback.invoke(e.getMessage());
        }
    }
}
