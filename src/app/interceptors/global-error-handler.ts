import { ErrorHandler, Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private toastCtrl: ToastController) {}
	handleError(error: Error): void {
		console.log(`Paso por el global error...`)

		// this.presentErrorToast(error.message)
		// this.presentErrorToast(error)

		// const chunkFailedMessage = /Loading chunk [\d]+ failed/

		// if (chunkFailedMessage.test(error.message)) {
		// 	window.location.reload()
		// }
		throw error
	}

	// Presenta el toast con el error
	async presentErrorToast(msg: string): Promise<void> {
		const toast = await this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom',
			color: 'danger',
			cssClass: 'toast',
			buttons: [
				{
					text: 'Ok',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked')
					},
				},
			],
		})
		toast.present()
	}
}
