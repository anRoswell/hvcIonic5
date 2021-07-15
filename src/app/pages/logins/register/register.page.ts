import { Component } from '@angular/core'
import { Location } from '@angular/common'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { NavController, AlertController } from '@ionic/angular'

import { ConfirmPasswordValidator } from './confirm-password.validator'
import { AuthenticateService } from '../../../services/authenticate.service'
import { HttpService } from 'src/app/services/http.service'

import { EmailVerification } from '../../../Interfaces/interfaces'
import { CheckconnectionService } from 'src/app/services/checkconnection.service'
import { UtilsService } from 'src/app/services/utils.service'

import { Plugins } from '@capacitor/core'

const { Geolocation, Network } = Plugins

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
	public defaultHref = ''
	emailVerification: EmailVerification = {
		usrEmail: '',
		usrNames: '',
		usrLastNames: '',
	}
	customActionSheetOptions: any = {
		header: 'Seleccione su PQR',
		cssClass: 'classActionSheetPersonalize',
	}
	stateIdentificationType = {
		cedula: false,
		extranjera: false,
		pasaporte: false,
	}
	unamePattern = '^[a-zA-Z0-9-]{5,15}$'
	numericPatter = '^[0-9]{5,15}$'
	loading: any
	codigoVerificacion: number
	errorCodValidation: string
	Form: FormGroup
	errorMessage = ''
	public validationsMessage = {
		usrEmail: [
			{
				type: 'required',
				message: 'El e-mail es requerido',
			},
			{
				type: 'email',
				message: 'Debe ingresar un email valido',
			},
		],
		usrEmailAlternative: [
			{
				type: 'email',
				message: 'Debe ingresar un email alternativo valido',
			},
		],
		usrPassword: [
			{
				type: 'required',
				message: 'El password es requerido',
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
		usrNames: [
			{
				type: 'required',
				message: 'El nombre completo es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 10 letras para el nombre',
			},
		],
		usrLastNames: [
			{
				type: 'required',
				message: 'El e-mail es requerido',
			},
			{
				type: 'email',
				message: 'Debe ingresar un email valido',
			},
		],
		usrNroCelular: [
			{
				type: 'required',
				message: 'El celular es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 7 numero para el celular',
			},
		],
		usrDireccion: [
			{
				type: 'required',
				message: 'La dirección es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 5 caracteres para la dirección',
			},
		],
		extDocExtranjero: [
			{
				type: 'required',
				message: 'Tipo de documento es requerido',
			},
		],
		identificationTypeId: [
			{
				type: 'required',
				message: 'Tpo de identificación es requerido',
			},
		],
		usrCedula: [
			{
				type: 'required',
				message: 'La cedula es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo número de digitos (6)',
			},
			{
				type: 'maxlength',
				message: 'Máximo número de digitos (11)',
			},
		],
		userTypesId: [
			{
				type: 'required',
				message: 'El tipo de usuario es requerido',
			},
		],
	}
	constructor(
		private formBuilder: FormBuilder,
		private navCtrl: NavController,
		private authService: AuthenticateService,
		private alertController: AlertController,
		private httpservice: HttpService,
		private location: Location,
		private utilsService: UtilsService,
		private checkconnectionService: CheckconnectionService,
	) {
		this.Form = this.formBuilder.group(
			{
				usrNames: ['', [Validators.required, Validators.minLength(5)]],
				usrLastNames: ['', [Validators.required, Validators.minLength(5)]],
				usrNroCelular: [''],
				usrEmail: ['', [Validators.required, Validators.email]],
				usrEmailAlternative: ['', [Validators.email]],
				usrPassword: ['', [Validators.required, Validators.minLength(8)]],
				confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
				identificationTypeId: ['', [Validators.required]],
				usrCedula: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
				userTypesId: ['', [Validators.required]],
				hasGeolocation: [false],
				usrLat: [null],
				usrLng: [null],
				usrTerminosCondiciones: [false, [Validators.requiredTrue]],
			},
			{ validator: ConfirmPasswordValidator.MatchPassword },
		)
	}

	ionViewDidEnter() {
		this.defaultHref = `/login`
		this.getCurrentPosition()
	}

	/**
	 * Metodo q recibe data del form y envia a service para procesarla
	 */
	async register() {
		Network.getStatus()
			.then((status) => {
				if (status.connected) {
					this.getCurrentPosition()
				}
			})
			.catch((err) => console.log(err))
		const registerUserData = this.Form.value
		registerUserData.usrPassword = btoa(registerUserData.usrPassword)
		this.authService.registerUser(registerUserData).subscribe((resp) => this.presentAlertConfirmRegister())
	}

	private getCurrentPosition(): Promise<any> {
		return new Promise((resolve, reject) => {
			Geolocation.getCurrentPosition().then(
				(position) => {
					this.Form.patchValue({
						hasGeolocation: true,
						usrLat: position.coords.latitude,
						usrLng: position.coords.longitude,
					})
					resolve(position)
				},
				(err) => {
					reject('No se pudo obtener localización.')
				},
			)
		})
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValid(field: string, validationType: string) {
		const f = this.Form.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	goToLogin() {
		this.navCtrl.navigateBack('/login')
	}

	public async confirmarCodigoSaveForm(messageMsge = '') {
		const alert = await this.alertController.create({
			header: 'CODIGO VALIDACIÓN!',
			subHeader: 'Enviado a correo registrado!!!',
			message: messageMsge,
			backdropDismiss: false,
			inputs: [
				{
					name: 'codigoVerificacion',
					type: 'number',
					placeholder: 'Ingrese codigo',
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						// this.goToLogin()
						console.log('Confirm Cancel')
					},
				},
				{
					text: 'Ok',
					cssClass: 'primary',
					handler: ({ codigoVerificacion }) => {
						if (this.codigoVerificacion === parseInt(codigoVerificacion, 10)) {
							this.register()
						} else {
							this.confirmarCodigoSaveForm(`<ion-text color="danger"><strong>Codigo invalido...</strong></ion-text>`)
							this.errorCodValidation = `Codigo de verificación incorrecto, ${codigoVerificacion}`
						}
					},
				},
			],
		})

		await alert.present()
	}

	public async presentAlertConfirmRegister() {
		const alert = await this.alertController.create({
			header: 'REGISTRO EXITOSO!',
			backdropDismiss: false,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel')
					},
				},
				{
					text: 'Ok',
					cssClass: 'primary',
					handler: () => {
						this.goToLogin()
					},
				},
			],
		})

		await alert.present()
	}

	/**
	 * Validamos q el email ingresado pertenezca al usuario
	 */
	async validateEmail() {
		await this.checkconnectionService.CheckConection().then(async (_) => {
			await this.utilsService.presentLoading()
			const usrCedula = this.Form.get('usrCedula').value
			const usrNames = this.Form.get('usrNames').value
			const usrLastNames = this.Form.get('usrLastNames').value
			const usrTerminosCondiciones = this.Form.get('usrTerminosCondiciones').value
			const usrEmail = this.Form.get('usrEmail').value
			const identificationTypeId = this.Form.get('identificationTypeId').value
			const mailVerifiy = {
				usrNames,
				usrLastNames,
				usrEmail,
				usrTerminosCondiciones,
				usrCedula,
				identificationTypeId,
			}
			this.authService.codigoVerificacion(mailVerifiy).subscribe(
				(resp) => {
					this.codigoVerificacion = resp.body.codVerificacion
					this.confirmarCodigoSaveForm()
				},
				(error) => (this.errorCodValidation = error),
			)
		})
	}

	/**
	 * Validacion Asyncrona, no funciona aun
	 */
	validateEmailRegistred() {
		return (control: AbstractControl) => {
			const data = {
				email: control.value,
			}
			this.httpservice.Post(data, '/validateEmailRegistred').subscribe((response) => {
				return response ? null : { notAvailable: true }
			})
		}
	}

	back() {
		this.location.back()
	}
}
