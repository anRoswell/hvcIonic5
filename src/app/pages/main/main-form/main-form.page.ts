import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'

//Plugins
import { format, isThisQuarter } from 'date-fns'
import { CheckconnectionService } from 'src/app/services/checkconnection.service'
import { HttpService } from 'src/app/services/http.service'
import { StorageService } from 'src/app/services/storage.service'
import { FirmaPage } from '../../membership/firma/firma.page'
import { ShowpicturePage } from '../../membership/showpicture/showpicture.page'

@Component({
	selector: 'app-main-form',
	templateUrl: './main-form.page.html',
	styleUrls: ['./main-form.page.scss'],
})
export class MainFormPage implements OnInit {
	@Input() action: string
	public form: FormGroup
	public horaIngresoValue: string
	public horaFinalValue: string
	public sign: string
	public btnShowSign = false
	public userLogin: any
	public patientSelected = {
		id: 0,
		name: '',
		lastName: '',
		document: 0,
		epsId: 0,
	}
	public atentionByPatient: any
	public btnLabel = 'Guardar'

	constructor(
		private fb: FormBuilder,
		private httpService: HttpService,
		private modalController: ModalController,
		private storageService: StorageService,
		private checkconnectionService: CheckconnectionService,
		private route: ActivatedRoute,
	) {
		this.userLogin = this.storageService.read('userLogin')
		this.route.queryParams.subscribe((param) => {
			console.log(param)
			this.action = param.action
		})

		this.form = this.fb.group({
			id: [],
			date: [new Date(), Validators.required],
			initialHour: ['', Validators.required],
			finalHour: ['', Validators.required],
			patientId: [Validators.required],
			patientSign: [[Validators.required]],
			sign: [Validators.required],
			observation: [Validators.required],
			lat: [],
			lng: [],
			userIdCreatedAt: [Validators.required],
			action: [Validators.required],
		})
	}

	async ngOnInit() {
		let time1
		let time2
		this.patientSelected = await this.storageService.read('patientSelected')
		if (this.action === 'edit') {
			this.btnLabel = 'Editar'
			this.atentionByPatient = await this.storageService.read('atentionByPatient')
			console.log(this.atentionByPatient)
			time1 = this.atentionByPatient.initialHour.split(':')
			time2 = this.atentionByPatient.finalHour.split(':')
			console.log(this.atentionByPatient.initialHour)
			console.log(this.atentionByPatient.finalHour)
			const initialHour = new Date(2021, 1, 1, parseInt(time1[0]), parseInt(time1[1])).toISOString()
			const finalHour = new Date(2021, 1, 1, parseInt(time2[0]), parseInt(time2[1])).toISOString()
			this.form.patchValue({
				id: this.atentionByPatient.id,
				date: format(new Date(), 'dd/MM/yyyy'),
				patientId: this.atentionByPatient.patientId,
				userIdCreatedAt: this.userLogin.id,
				observation: this.atentionByPatient.observation,
				action: this.action,
				patientSign: false,
				initialHour,
				finalHour,
			})
			this.horaIngresoValue = new Date(2021, 1, 1, time1[0], time1[1]).toISOString()
			this.horaFinalValue = new Date(2021, 1, 1, time2[0], time2[1]).toISOString()
			this.sign = `http://localhost:3000/${this.atentionByPatient.signUrl}`
			//this.editForm()
		} else {
			this.btnLabel = 'Guardar'
			this.form.reset()
			this.form.patchValue({
				date: format(new Date(), 'dd/MM/yyyy'),
				patientId: this.patientSelected.id,
				userIdCreatedAt: this.userLogin,
				action: this.action,
				patientSign: false,
			})
		}
	}

	//#region FORM

	saveEditForm() {
		this.checkconnectionService.CheckConection().then(async (_) => {
			this.httpService.Post(this.form.value, 'atencion').subscribe((resp) => {
				console.log(resp)
			})
		})
	}

	editForm() {
		console.log(`llego`)
		console.log(this.atentionByPatient)
		this.form.patchValue({
			patientId: this.atentionByPatient.patientId,
			userIdCreatedAt: this.userLogin.id,
			observation: this.atentionByPatient.observation,
		})
	}

	/**
	 * Obtenemos datos de la consulta del paciente si ya fue realizado
	 */
	getDatePatient() {
		this.checkconnectionService.CheckConection().then(async (_) => {
			this.httpService.Get('consultaPatient').subscribe((resp) => {
				console.log(resp)
			})
		})
	}
	//#endregion FORM

	/**
	 * Se llama a modal para obtener firma
	 */
	async getSign() {
		const modal = await this.modalController.create({
			component: FirmaPage,
			// componentProps: this.userLoginData,
		})

		modal.onDidDismiss().then((result: OverlayEventDetail) => {
			console.log(result)
			if (result.data !== undefined) {
				if (result.data.action !== 'close') {
					const { sign } = result.data
					this.form.patchValue({
						patientSign: true,
						sign: sign,
					})
					this.sign = sign
					this.btnShowSign = true
				} else {
					// this.btnShowSign = false
				}
			} else {
				// this.btnShowSign = false
			}
		})
		return await modal.present()
	}

	dismissModal() {
		this.modalController.dismiss({ close: 'yes' })
	}

	/**
	 * Mostramos picture en el modal
	 */
	async showPicture(): Promise<any> {
		const modalShow = await this.modalController.create({
			component: ShowpicturePage,
			componentProps: {
				sign: this.sign,
			},
		})

		modalShow.onDidDismiss().then((result: OverlayEventDetail) => {
			console.log(result)
			if (result.data !== undefined) {
				const { sign } = result.data
				this.form.patchValue({
					patientSign: true,
					sign: sign,
				})
				this.sign = sign
			}
		})
		return await modalShow.present()
	}
}
