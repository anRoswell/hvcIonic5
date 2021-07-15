import { CheckconnectionService } from './../../../services/checkconnection.service'
import { Component, OnInit } from '@angular/core'
import { NavigationExtras, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { StorageService } from './../../../services/storage.service'
import { AuthenticateService } from './../../../services/authenticate.service'

import { environment } from './../../../../environments/environment'
import { MenuController } from '@ionic/angular'
const { server } = environment

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public form: FormGroup
	public validationsMessage = {
		username: [
			{
				type: 'required',
				message: 'El email es requerido',
			},
			{
				type: 'pattern',
				message: 'ojo! este no es un email valido',
			},
		],
		password: [
			{
				type: 'required',
				message: 'El password es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 8 letras para el password',
			},
		],
	}
	public permisosState = false
	public server = server

	constructor(
		private router: Router,
		private authService: AuthenticateService,
		private storage: StorageService,
		private fb: FormBuilder,
		private checkconnectionService: CheckconnectionService,
		private menu: MenuController,
	) {
		this.form = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(8)]],
		})
	}

	ngOnInit() {}

	ionViewWillEnter() {
		console.log('ionViewWillEnter')
		this.menu.enable(false)
	}

	/**
	 * Validamos credenciales para login
	 * @param credentials = Data del formulario
	 */
	async loginUser(credentials: any) {
		this.checkconnectionService.CheckConection().then(async (_) => {
			credentials.password = credentials.password
			this.authService.loginUser(credentials).subscribe(async (result) => {
				const { id } = result
				this.storage.save('isUserLoggedIn', true)
				this.storage.save('userLogin', result)
				this.goService(id)
			})
		})
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValid(field: string, validationType: string) {
		const f = this.form.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	goService(id: number) {
		const navigationExtras: NavigationExtras = {
			queryParams: {
				action: 'login',
			},
			fragment: 'anchor',
		}
		//this.router.navigate(['/main/list'], navigationExtras)
		this.router.navigate(['/main/list'])
	}
}
