import { Plugins } from '@capacitor/core'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoadingController, ToastController } from '@ionic/angular'
import { Observable } from 'rxjs'

const { Toast, Browser } = Plugins

import { IMenu } from '../Interfaces/interfaces'

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	loading: any
	constructor(
		private loadingController: LoadingController,
		private http: HttpClient,
		public toastController: ToastController,
	) {}

	public getMenuOpts(): Observable<IMenu[]> {
		return this.http.get<IMenu[]>('./../../assets/data/menu.json')
	}

	public async toastCapacitor(msg: string, posicion: any = 'bottom') {
		await Toast.show({
			text: msg,
			position: posicion,
			duration: 'long',
		})
	}

	/**
	 * Mostramos Loaging
	 */
	public async presentLoading() {
		this.loading = await this.loadingController.create({
			message: 'Cargando...',
		})
		await this.loading.present()
		// const { role, data } = await this.loading.onDidDismiss()
	}

	/**
	 * Finaliza loading
	 */
	async dismissLoading(): Promise<any> {
		this.loadingController.getTop().then((hasLoading) => {
			if (hasLoading) {
				this.loading.dismiss()
			}
		})
	}

	async presentToast(msg: string, posicion: any = 'bottom', color = 'success') {
		const toast = await this.toastController.create({
			message: msg,
			duration: 3000,
			position: posicion,
			color,
		})
		toast.present()
	}

	async inappBrowser(url: string) {
		await Browser.open({ url })
	}

	// /**
	//  * Validamos si tenemos permiso
	//  */
	// async getPermissions() {
	// 	const { hasPermission } = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA)

	// 	// alert('hasPermission: ' + hasPermission)
	// 	if (!hasPermission) {
	// 		const result = await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA])
	// 		// alert(`requestPermissions: ${result.hasPermission}`)

	// 		if (!result.hasPermission) {
	// 			// alert('Permissions required, return 3')
	// 			return 3
	// 			// throw new Error("Permissions required");
	// 		}

	// 		// console.log('Ok, a user gave us permission, we can get him identifiers after restart app, return 2')
	// 		// ok, a user gave us permission, we can get him identifiers after restart app
	// 		return 2
	// 	}
	// 	console.log('return 1')
	// 	return 1
	// }

	ReloadToPermisionss() {
		window.location.reload()
	}
}
