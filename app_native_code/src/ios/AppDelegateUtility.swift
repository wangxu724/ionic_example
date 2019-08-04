//
//  AppUtility.swift
//  MyApp
//
//  Created by XuWang on 7/10/19.
//

import Foundation
import UserNotifications

@objc(AppDelegateUtility) class AppDelegateUtility : NSObject {
    @objc(cutomizedAppDidLaunchStep) static func cutomizedAppDidLaunchStep() {
        initDelegates()
        promptForNotificationPermission()
        addObservers()
    }

    @objc static func initDelegates() {
        GeofenceManager.shared
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
    }
}
