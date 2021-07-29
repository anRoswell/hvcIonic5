import { HttpParams } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { NavigationExtras, Router } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'

import { MainFormPage } from '../main-form/main-form.page'
import { HttpService } from 'src/app/services/http.service'
import { StorageService } from 'src/app/services/storage.service'
import { CheckconnectionService } from 'src/app/services/checkconnection.service'

@Component({
	selector: 'app-list-atentions',
	templateUrl: './list-atentions.page.html',
	styleUrls: ['./list-atentions.page.scss'],
})
export class ListAtentionsPage implements OnInit {
	public atentionsByPatient = [
		{
			name: '',
			lastName: '',
			document: '',
			epsId: '',
			createdAt: '',
		},
	]
	public imgNoData = './assets/img/No_data.svg'
	public userLogin: any
	public patientSelected = {
		id: 0,
		name: '',
		lastName: '',
		document: 0,
		epsId: 0,
	}

	constructor(
		private storageService: StorageService,
		private reouter: Router,
		private httpService: HttpService,
		private checkconnectionService: CheckconnectionService,
		private modalController: ModalController,
	) {
		this.userLogin = this.storageService.read('userLogin')
		this.patientSelected = this.storageService.read('patientSelected')
	}

	ngOnInit() {
		this.getListatentionsByPatient()
	}

	getListatentionsByPatient() {
		this.checkconnectionService.CheckConection().then(async (_) => {
			const params = new HttpParams().set('userIdCreatedAt', this.userLogin.id.toString())
			this.httpService.GetParams(`atentionsByPatient/${this.patientSelected.id}`, params).subscribe((resp) => {
				console.log(resp)
				this.atentionsByPatient = resp
			})
		})
	}

	async registerConsultPatient() {
		// const modal = await this.modalController.create({
		// 	component: MainFormPage,
		// 	componentProps: {
		// 		action: 'register',
		// 	},
		// })

		// modal.onDidDismiss().then((result: OverlayEventDetail) => {
		// 	if (result.data !== undefined) {
		// 		if (result.data.close !== 'yes') {
		// 		}
		// 	}
		// })
		// return await modal.present()

		const navigationExtras: NavigationExtras = {
			queryParams: {
				action: 'register',
			},
			fragment: 'anchor',
		}
		this.reouter.navigate(['main/main-form'], navigationExtras)
	}

	async editAtention(atention: any) {
		atention.action = 'edit'
		this.storageService.save('atentionByPatient', atention)

		// const modal = await this.modalController.create({
		// 	component: MainFormPage,
		// 	componentProps: {
		// 		action: 'edit',
		// 	},
		// })

		// modal.onDidDismiss().then((result: OverlayEventDetail) => {
		// 	if (result.data !== undefined) {
		// 		if (result.data.close !== 'yes') {
		// 		}
		// 	}
		// })
		// return await modal.present()

		const navigationExtras: NavigationExtras = {
			queryParams: {
				action: 'edit',
			},
			fragment: 'anchor',
		}
		this.reouter.navigate(['main/main-form'], navigationExtras)
	}

	validateAtentionsByPatient(): boolean {
		return this.atentionsByPatient.length !== 0
	}
}
