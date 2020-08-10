import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from '../utils/registerPushNotifications';

export default function getExpoToken() {
  const [expoToken, setExpoPushToken] = useState('');

  const [, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeAllNotificationListeners();
    };
  }, []);

  return expoToken;
}
