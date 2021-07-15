import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { StorageService } from '../services/storage.service'

@Injectable({
	providedIn: 'root',
})
export class ContratoYaAdquiridoGuard implements CanActivate {
	constructor(private storageService: StorageService, public alertController: AlertController) {}

	async canActivate() {
		const filtroContratoAdquirido = await this.storageService.read('filtroContratoAdquirido')
		if (filtroContratoAdquirido) {
			this.presentAlert()
			return false
		} else {
			return true
		}
	}

	async presentAlert() {
		const alert = await this.alertController.create({
			cssClass: 'classAlertContrato',
			header: 'VALIDACIÓN',
			message: 'Solo puede tener 1 contrato activo.',
			buttons: ['OK'],
		})

		await alert.present()

		const { role } = await alert.onDidDismiss()
		console.log('onDidDismiss resolved with role', role)
	}
}
