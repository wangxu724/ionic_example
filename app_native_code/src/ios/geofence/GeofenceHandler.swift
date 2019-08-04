//
//  GeofenceHandler.swift
//  MyApp
//
//  Created by XuWang on 8/3/19.
//

import Foundation
import UserNotifications

class GeofenceHandler {
    public static func handleGeofenceTransition(geofenceModel: JSON) {
        
        guard let latitude = geofenceModel["latitude"].double else { return }
        guard let longitude = geofenceModel["longitude"].double else { return }
        guard let radius = geofenceModel["radius"].double else { return }
        let transitionTypeValue = geofenceModel["transitionType"].int
        var transitionType = "Unknown"
        if (transitionTypeValue == 1) {
            transitionType = "Enter"
        } else if (transitionTypeValue == 2) {
            transitionType = "Exit"
        }
        
        sendLocalUserNotificaiton(latitude: latitude, longitude: longitude, radius: radius, transitionType: transitionType)
    }
    
    private static func sendLocalUserNotificaiton(latitude: Double, longitude: Double, radius: Double, transitionType: String) {
        UNUserNotificationCenter.current().getNotificationSettings { (settings) in
            guard settings.authorizationStatus == .authorized else { return }
            
            let content = UNMutableNotificationContent()
            content.title = "Geofence triggered."
            content.body = "latitude: \(latitude), longitude: \(longitude), radius: \(radius), transitionType: \(transitionType)."
            content.categoryIdentifier = "alarm"
            content.sound = UNNotificationSound.default()
            
            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
            let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)
            UNUserNotificationCenter.current().add(request)
        }
    }
}
