package com.myapp;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.ionic.starter.R;

public class GeofenceTransitionReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String error = intent.getStringExtra("error");

        if (error != null) {
            //handle error
            Log.println(Log.ERROR, "MyApp", error);
        } else {
            String geofencesJsonString = intent.getStringExtra("transitionData");
            try {
                JSONArray geofences = new JSONArray(geofencesJsonString);
                for (int i = 0; i < geofences.length(); i++) {
                    JSONObject geofence = geofences.getJSONObject(i);
                    Double latitude = geofence.getDouble("latitude");
                    Double longitude = geofence.getDouble("longitude");
                    Double radius = geofence.getDouble("radius");
                    Integer transitionTypeValue = geofence.getInt("transitionType");
                    String transitionType = "Unknown";
                    if (transitionTypeValue == 1) {
                        transitionType = "Enter";
                    }
                    else if (transitionTypeValue == 2) {
                        transitionType = "Exit";
                    }

                    this.sendNotification(
                            context,
                            latitude,
                            longitude,
                            radius,
                            transitionType);
                }
            } catch (JSONException ex) {
                Log.println(Log.ERROR, "MyApp", ex.getMessage());
            }
        }
    }

    private void sendNotification(Context context, Double latitude, Double longitude, Double radius, String transitionType) {
        String channelId = "MyAppChannelId";

        this.createNotificationChannel(context, channelId);

        String content = String.format("latitude: %f, longitude: %f, radius: %f, transitionType: %s", latitude, longitude, radius, transitionType);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelId)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle("Geofence triggered")
                .setContentText(content)
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText(content))
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setAutoCancel(true);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);

        Integer someRandomUniqueNumberPerNotificaiton = 1;
        notificationManager.notify(someRandomUniqueNumberPerNotificaiton, builder.build());
    }

    private void createNotificationChannel(Context context, String channelId) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "MyApp";
            String description = "Receive notification";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(channelId, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    };
}
