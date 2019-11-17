import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { UpdatePatientToken } from './api.js';

export async function registerForPushNotificationsAsync(patientId) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  console.log(token)
  //UpdatePatientToken(patientId, token);
  UpdatePatientToken(patientId, token)
			.then(response => {
				return response.json();
			})
			.then(json => {
                console.log('no hay error')
				console.log(json)
			}).catch(error => {
				console.log(error.message);
			});
}