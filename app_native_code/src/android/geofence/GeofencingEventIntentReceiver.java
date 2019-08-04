package com.myapp.geofence;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingEvent;

import java.util.ArrayList;
import java.util.List;

public class GeofencingEventIntentReceiver extends BroadcastReceiver {
    protected static final String tag = "MyApp";
    protected static final String GeofenceTransitionIntent = "com.geofence.GEOFENCE_TRANSITION";
    protected static final String GeofencetransitionBroadcastPermission = "com.geofence.permission.GEOFENCE_TRANSITION_BROADCAST";
    protected GeofenceModelStore store;

    @Override
    public void onReceive(Context context, Intent intent) {
        GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);
        if (geofencingEvent.hasError()) {
            int errorCode = geofencingEvent.getErrorCode();
            String error = "Location Services error: " + Integer.toString(errorCode);
            Log.d(tag, error);
        } else {
            int transitionType = geofencingEvent.getGeofenceTransition();
            boolean enter = transitionType == Geofence.GEOFENCE_TRANSITION_ENTER;
            boolean exit = transitionType == Geofence.GEOFENCE_TRANSITION_EXIT;
            if (enter || exit) {
                List<Geofence> geofenceList = geofencingEvent.getTriggeringGeofences();
                List<GeofenceModel> geofenceModels = new ArrayList<GeofenceModel>();
                GeofenceModelStore store = new GeofenceModelStore(context);
                for (Geofence fence : geofenceList) {
                    String fenceId = fence.getRequestId();
                    GeofenceModel geofenceModel = store
                            .getGeofenceModel(fenceId);

                    if (geofenceModel != null) {
                        geofenceModel.transitionType = transitionType;
                        geofenceModels.add(geofenceModel);
                    }
                }

                if (geofenceModels.size() > 0) {
                    GeofenceTransitionHandler.handleGeofenceTransition(context, geofenceModels);
                }
            } else {
                String error = "Geofence transition error: " + transitionType;
                Log.d(tag, error);
            }
        }
    }
}
