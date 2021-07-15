import { Location } from '@angular/common'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { AlertController, Platform } from '@ionic/angular'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

import { ConfirmPasswordValidator } from './confirm-password.validator'

import { CheckconnectionService } from './../../../services/checkconnection.service'
import { AuthenticateService } from './../../../services/authenticate.service'
import { SendMailService } from './../../../services/send-mail.service'
import { UtilsService } from './../../../services/utils.service'

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.page.html',
	styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
	public defaultHref = ''
	public usuarioName: string
	public userData: any = {}
	public paso1 = true
	public paso2 = false
	public paso3 = false
	public codVerificacion: number
	public formUno: FormGroup
	public formDos: FormGroup
	public formTres: FormGroup
	public wrongCodVerificacion: string
	public idUser: number
	public codVerificacionMessage = false
	public emailRecovery: string
	public validationsMessage = {
		emailRecovery: [
			{
				type: 'required',
				message: 'El e-mail es requerido',
			},
			{
				type: 'email',
				message: 'Digite por favor un email valido',
			},
		],
		codVerficacion: [
			{
				type: 'required',
				message: 'Por favor ingrese el código de verificación.',
			},
			{
				type: 'minlength',
				message: 'Minimo 2 caracteres para el codVerficacion',
			},
		],
		password: [
			{
				type: 'required',
				message: 'El Password es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 8 caracteres para el password',
			},
		],
		confirmPassword: [
			{
				type: 'required',
				message: 'Confirmacion password es requerida',
			},
			{
				type: 'minlength',
				message: 'Minimo 8 caracteres para la contraseña',
			},
		],
	}

	constructor(
		private MailService: SendMailService,
		private fb: FormBuilder,
		private auth: AuthenticateService,
		private alertController: AlertController,
		private router: Router,
		private utilService: UtilsService,
		private checkconnectionService: CheckconnectionService,
		private platform: Platform,
		private location: Location,
	) {
		this.formUno = this.fb.group({
			emailRecovery: ['', [Validators.required, Validators.email]],
		})

		this.formDos = this.fb.group({
			codVerficacion: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
		})

		this.formTres = this.fb.group(
			{
				password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
				confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
			},
			{ validator: ConfirmPasswordValidator.MatchPassword },
		)
		this.formChange()
	}

	async ngOnInit() {
		this.platform.ready().then((source) => {})
	}

	ionViewDidEnter() {
		this.defaultHref = `/login`
	}

	RecoveryPasswordMail(dataForm1: any): void {
		this.checkconnectionService.CheckConection().then(async () => {
			await this.utilService.presentLoading()
			this.emailRecovery = dataForm1.emailRecovery
			this.MailService.RecoveryPass(this.emailRecovery).subscribe((resp) => {
				this.codVerificacion = resp.body.codVerificacion
				this.idUser = resp.body.id
				this.paso1 = false
				this.paso2 = true
				this.paso3 = false
			})
		})
	}

	/**
	 * Validamos codigo de verificación
	 * @param codVer = Codigo de verificación
	 */
	compareCodVerificacion(codVer: any): void {
		if (parseInt(codVer.codVerficacion, 10) !== this.codVerificacion) {
			this.wrongCodVerificacion = `Codigo incorrecto por favor verificar!!!`
		} else {
			this.wrongCodVerificacion = ''
			this.paso1 = false
			this.paso2 = false
			this.paso3 = true
		}
	}

	/**
	 * Actualizamos password
	 * @param dataFormTres Obtenemos datos del formulario numero tres
	 */
	updatePassword(dataFormTres: any): void {
		this.checkconnectionService.CheckConection().then(async () => {
			await this.utilService.presentLoading()
			this.auth.updatePassword(this.idUser, btoa(dataFormTres.password)).subscribe((resp) => {
				this.presentAlert()
			})
		})
	}

	noRecibistesCodigo() {}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValidUno(field: string, validationType: string): boolean {
		const f = this.formUno.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValidDos(field: string, validationType: string): boolean {
		const f = this.formDos.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValidTres(field: string, validationType: string): boolean {
		const f = this.formTres.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	/**
	 * Se presenta Alert
	 */
	async presentAlert(): Promise<void> {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Actualizción de contraseña',
			message: '<strong>Exitosa.</strong>',
			buttons: [
				{
					text: 'OK',
					handler: () => {
						this.router.navigate(['/login'])
					},
				},
			],
		})
		await alert.present()
	}

	/**
	 * Dejamos el input del codigo de verificacion en modo escucha para detectar los cambios y validar
	 */
	public formChange() {
		const codVerificacion = this.formDos.get('codVerficacion')
		codVerificacion.valueChanges.subscribe((data) => {
			if (data !== this.codVerificacion && data !== null) {
				this.codVerificacionMessage = true
			} else {
				this.codVerificacionMessage = false
			}
		})
	}

	back() {
		this.location.back()
	}
}
