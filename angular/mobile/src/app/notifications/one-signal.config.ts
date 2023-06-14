import { Preferences } from '@capacitor/preferences';
import OneSignal from 'onesignal-cordova-plugin';

export const PLAYERID_KEY = "ngxplayerid";

// Call this function when your app starts
export default function OneSignalInit(onSubscribe?:()=> void): void {
  // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("d2499c18-3691-4501-8e69-56538b2a75d4");
  OneSignal.setNotificationOpenedHandler(function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });

  
  if ((window as any).plugins) {
    const observer = ((state:any) => {
      if (!state.from.isSubscribed && state.to.isSubscribed) { 
        console.log('USER ID RETRIEVED', state.to.userId);
        Preferences.set({ key: PLAYERID_KEY, value:state.to.userId });
      }
      console.log('FORCING USER ID RETRIEVING', state.to.userId);
      if (onSubscribe)
        onSubscribe();
      (window as any).plugins.OneSignal.removeSubscriptionObserver(observer);
    });
    (window as any).plugins.OneSignal.addSubscriptionObserver(observer);
  }
}