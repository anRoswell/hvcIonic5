import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import SignaturePad from 'signature_pad'
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'

import { ModalController, Platform } from '@ionic/angular'

@Component({
	selector: 'app-firma',
	templateUrl: './firma.page.html',
	styleUrls: ['./firma.page.scss'],
})
export class FirmaPage implements OnInit {
	@ViewChild('canvas', { static: true }) signaturePadElement: { nativeElement: HTMLCanvasElement }
	signaturePad: any
	canvasWidth: number
	canvasHeight: number

	private id: string
	public firma: string

	constructor(
		private route: ActivatedRoute,
		private elementRef: ElementRef,
		private base64ToGallery: Base64ToGallery,
		private androidPermissions: AndroidPermissions,
		public plt: Platform,
		private modalController: ModalController,
		private location: Location,
	) {
		this.id = this.route.snapshot.paramMap.get('id')
		console.log(this.id)
	}

	ngOnInit() {
		this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement)
		this.signaturePad.clear()
		this.signaturePad.penColor = 'rgb(56,128,255)'
		this.init()
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.init()
	}

	init() {
		const canvas: any = this.elementRef.nativeElement.querySelector('canvas')
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight - 140
		if (this.signaturePad) {
			this.signaturePad.clear() // Clear the pad on init
		}
	}

	save(): void {
		console.log(this.plt.platforms())
		if (this.plt.platforms().includes('desktop') || this.plt.platforms().includes('mobileweb')) {
			const img = this.signaturePad.toDataURL()
			this.firma = img
			this.dismissModal('save')
		} else {
			this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
				(result) => {
					if (result.hasPermission) {
						const img = this.signaturePad.toDataURL()
						this.firma = img
						this.dismissModal('save')
						this.base64ToGallery.base64ToGallery(img).then(
							(res) => console.log('Saved image to gallery ', res),
							(err) => console.log('Error saving image to gallery ', err),
						)
					} else {
						this.requestPermissions()
					}
				},
				(err) => this.requestPermissions(),
			)
		}
	}

	requestPermissions() {
		this.androidPermissions
			.requestPermissions([
				this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
				this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
			])
			.then(
				(res) => {
					this.save()
				},
				(err) => console.log('Error saving image to gallery ', err),
			)
	}

	isCanvasBlank(): boolean {
		if (this.signaturePad) {
			return this.signaturePad.isEmpty() ? true : false
		}
	}

	clear() {
		this.signaturePad.clear()
	}

	undo() {
		const data = this.signaturePad.toData()
		if (data) {
			data.pop() // remove the last dot or line
			this.signaturePad.fromData(data)
		}
	}

	/**
	 * Cierra modal
	 * @param data = Información a enviar al padre
	 */
	dismissModal(action: string) {
		this.modalController.dismiss({
			close: 'yes',
			action,
			sign: this.firma,
		})
	}

	back() {
		this.dismissModal('close')
		// this.location.back()
	}
}
