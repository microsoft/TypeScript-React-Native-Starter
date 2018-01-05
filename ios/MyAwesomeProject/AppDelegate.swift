//
//  AppDelegate.swift
//  MyAwesomeProject
//
//  Created by Aaron Sky on 1/5/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var launchOptions: [UIApplicationLaunchOptionsKey: Any]?
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
    self.launchOptions = launchOptions
    let jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index.ios", fallbackResource: nil)
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "MyAwesomeProject", initialProperties: nil, launchOptions: launchOptions)
    rootView?.backgroundColor = UIColor.white
    
    window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    window?.rootViewController = rootViewController
    window?.makeKeyAndVisible()
    return true
  }
}
