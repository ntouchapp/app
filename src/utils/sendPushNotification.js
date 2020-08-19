import * as Notifications from 'expo-notifications';
import moment from 'moment';

export default async function sendPushNotification(
  expoPushToken,
  { name, phoneNumber },
  date
) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'A friendly reminder 😁',
    body: `Don't forget to reach out to ${name} today. Their number is ${phoneNumber} 😇`,
  };
  const d1 = moment(new Date());
  const d2 = moment(date);
  const seconds = d2.diff(d1, 'seconds');

  Notifications.scheduleNotificationAsync({
    content: message,
    trigger: {
      seconds,
    },
  });
}
