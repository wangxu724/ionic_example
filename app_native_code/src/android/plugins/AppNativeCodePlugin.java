package com.myapp.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;


public class AppNativeCodePlugin extends CordovaPlugin {
    public static final String TAG = "AppNativeCodePlugin";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(final String action, final JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                if (action.equals("initialize")) {
                    initialize(callbackContext);
                }
            }
        });

        return true;
    }

    private void initialize(CallbackContext callbackContext) {
    }
}