//
//  AppUserNotificationCenterDelegate.swift
//  MyApp
//
//  Created by XuWang on 7/13/19.
//

import Foundation
import UserNotifications

class AppUserNotificationCenterDelegate: NSObject, UNUserNotificationCenterDelegate {
    static let shared = AppUserNotificationCenterDelegate()

    private override init() {
        super.init()
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .sound, .badge]);
    }
}
