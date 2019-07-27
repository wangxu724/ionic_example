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
    
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .sound, .badge]);
    }
}
