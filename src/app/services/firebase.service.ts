import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {
	Plugins,
	PushNotification,
	PushNotificationToken,
	PushNotificationActionPerformed,
	Capacitor,
} from '@capacitor/core'

const { PushNotifications } = Plugins

@Injectable({
	providedIn: 'root',
})
export class FirebaseService {
	constructor(private router: Router) {}

	public initPush() {
		if (Capacitor.platform !== 'web') {
			this.registerPush()
		}
	}

	private registerPush() {
		// Request permission to use push notifications
		// iOS will prompt user and return if they granted permission or not
		// Android will just grant without prompting
		PushNotifications.requestPermission().then(
			(result) => {
				if (result.granted) {
					// Register with Apple / Google to receive push via APNS/FCM
					PushNotifications.register()
				} else {
					console.log(`Entro al else`)
				}
			},
			(err) => console.log(err),
		)

		// On success, we should be able to receive notifications
		PushNotifications.addListener('registration', (token: PushNotificationToken) => {
			alert('Push registration success, token: ' + token.value)
			console.log(token.value)
		})

		// Some issue with our setup and push will not work
		PushNotifications.addListener('registrationError', (error: any) => {
			alert('Error on registration: ' + JSON.stringify(error))
		})

		// Show us the notification payload if the app is open on our device
		PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
			alert('Push received: ' + JSON.stringify(notification))
		})

		// Method called when tapping on a notification
		PushNotifications.addListener(
			'pushNotificationActionPerformed',
			async (notification: PushNotificationActionPerformed) => {
				alert('Push action performed: ' + JSON.stringify(notification))
				const data = notification.notification.data
				console.log(`Action performed: ${JSON.stringify(notification.notification)}`)
				console.log(`Data: ${JSON.stringify(data)}`)
				if (data.detailsId) {
					this.router.navigateByUrl(`/home/${data.detailsId}`)
				}
			},
		)
	}
}
