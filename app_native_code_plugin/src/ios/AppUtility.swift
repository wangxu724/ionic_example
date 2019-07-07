//
//  AppUtility.swift
//  MyApp
//
//  Created by XuWang on 7/10/19.
//

import Foundation
import UserNotifications

@objc(AppUtility) class AppUtility : NSObject {
    @objc(cutomizedAppDidLaunchStep) static func cutomizedAppDidLaunchStep() {
        AppUtility.initDelegates()
        AppUtility.promptForNotificationPermission()
        AppUtility.addObservers()
    }

    @objc static func initDelegates() {
        let center = UNUserNotificationCenter.current()
        center.delegate = AppUserNotificationCenterDelegate.shared
    }

    @objc static func promptForNotificationPermission() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge])
        { (granted, error) in
            //            if granted {}
        }
    }

    @objc static func addObservers() {
        NotificationCenter.default.addObserver(
            AppUtility.self,
            selector: #selector(AppUtility.handleGeofenceTransition(notification:)),
            name: NSNotification.Name(rawValue: "didGeofenceTransition"),
            object: nil
        )
    }

    // private functions

    @objc(handleGeofenceTransition:) private static func handleGeofenceTransition(notification: NSNotification) {
        guard let transitionDataJsonString = notification.object as? String else  { return }
        guard let data = transitionDataJsonString.data(using: .utf8, allowLossyConversion: false) else { return }
        guard let transitionDataAsAny = try? JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.mutableContainers) else { return }
        guard let transitionData = transitionDataAsAny as? [String:AnyObject] else { return }

        guard let latitude = transitionData["latitude"] as? Double else { return }
        guard let longitude = transitionData["longitude"] as? Double else { return }
        guard let radius = transitionData["radius"] as? Double else { return }
        let transitionTypeValue = transitionData["transitionType"] as? Int
        var transitionType = "Unknown"
        if (transitionTypeValue == 1) {
            transitionType = "Enter"
        } else if (transitionTypeValue == 2) {
            transitionType = "Exit"
        }

        AppUtility.sendLocalUserNotificaiton(latitude: latitude, longitude: longitude, radius: radius, transitionType: transitionType)
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
