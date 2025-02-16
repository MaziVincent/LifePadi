import Flutter
import UIKit
import GoogleMaps
import workmanager
import awesome_notifications
import shared_preferences_foundation
import flutter_secure_storage
import FirebaseCore
import FirebaseMessaging

@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    // Google Maps API Key
    GMSServices.provideAPIKey("AIzaSyCDCjPcOfiVWRTDuH260B3nVRUmSuoHBoo")
    GeneratedPluginRegistrant.register(with: self)
    UNUserNotificationCenter.current().delegate = self

    WorkmanagerPlugin.setPluginRegistrantCallback { registry in
        // Registry in this case is the FlutterEngine that is created in Workmanager's
        // performFetchWithCompletionHandler or BGAppRefreshTask.
        // This will make other plugins available during a background operation.
        GeneratedPluginRegistrant.register(with: registry)
    }

    WorkmanagerPlugin.registerPeriodicTask(withIdentifier: "lifepadi.pingRider", frequency: NSNumber(value: 5 * 60))
    
    // This function registers the desired plugins to be used within a notification background action
    SwiftAwesomeNotificationsPlugin.setPluginRegistrantCallback { registry in          
        SwiftAwesomeNotificationsPlugin.register(
          with: registry.registrar(forPlugin: "io.flutter.plugins.awesomenotifications.AwesomeNotificationsPlugin")!)          
        SharedPreferencesPlugin.register(
          with: registry.registrar(forPlugin: "io.flutter.plugins.sharedpreferences.SharedPreferencesPlugin")!)
    }

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken:Data){
    // Fixes the error: APNS token has not been set yet.
    // Please ensure the APNS token is available by calling getAPNSToken()
    Messaging.messaging().apnsToken = deviceToken
    super.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }

   override func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
      completionHandler(.alert) // shows notification banner even if app is in foreground
  }
}
