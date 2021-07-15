import { Plugins } from '@capacitor/core'
import { Injectable } from '@angular/core'
import { AlertController, LoadingController } from '@ionic/angular'

const { Network } = Plugins

@Injectable({
	providedIn: 'root',
})
export class CheckconnectionService {
	loading: any
	constructor(private alertController: AlertController, private loadingController: LoadingController) {}

	public async CheckConection() {
		const handler = Network.addListener('networkStatusChange', (state) => {})
		// To stop listening:
		// handler.remove();

		// Get the current network status
		const status = await Network.getStatus()
		if (!status.connected) {
			this.alrtTryCnxn()
		} else {
			return status.connected
		}
	}

	/**
	 * Muestra un alert con Botones Cancelar y Reintentar
	 */
	private async alrtTryCnxn() {
		const alert = await this.alertController.create({
			header: 'Problemas de conexión',
			message: 'Por favor habilitar conexión a internet',
			buttons: [
				{
					text: 'Re intentar',
					role: 'cancelar',
					cssClass: 'secondary',
					handler: () => this.CheckConection(),
				},
			],
		})

		await alert.present()
	}

	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: 'Cargando...',
		})
		await this.loading.present()

		// const { role, data } = await this.loading.onDidDismiss()
	}

	dismissLoading() {
		this.loadingController.dismiss()
	}
}
