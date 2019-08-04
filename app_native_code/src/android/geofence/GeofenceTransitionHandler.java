package com.myapp.geofence;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.android.gms.location.Geofence;

import java.util.List;

import io.ionic.starter.R;

public class GeofenceTransitionHandler {
    protected static String CHANNEL_ID = "MyAppChannelId";

    public static void handleGeofenceTransition(Context context, List<GeofenceModel> geofenceModels) {
        for(GeofenceModel geofence: geofenceModels) {
            sendNotification(context, geofence);
        }
    }

    private static void sendNotification(Context context, GeofenceModel geofence) {
        createNotificationChannel(context, CHANNEL_ID);

        String transitionType = geofence.transitionType == Geofence.GEOFENCE_TRANSITION_ENTER ? "Enter" : "Exit";
        String content = String.format("latitude: %f, longitude: %f, radius: %d, transitionType: %s", geofence.latitude, geofence.longitude, geofence.radius, transitionType);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
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

    private static void createNotificationChannel(Context context, String channelId) {
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
