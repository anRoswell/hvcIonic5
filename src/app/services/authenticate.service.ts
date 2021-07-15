import { Injectable } from '@angular/core'
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

import { IRegisterUser, ILogin, IReportarPago } from '../Interfaces/interfaces'
import { environment, ApiNodeJs } from '../../environments/environment'
import { HttpService } from './http.service'
import { Router } from '@angular/router'
import { StorageService } from './storage.service'
import { MenuController } from '@ionic/angular'

@Injectable({
	providedIn: 'root',
})
export class AuthenticateService {
	apiUrl = ApiNodeJs
	httpOptions = {
		headers: new HttpHeaders({
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}),
	}

	constructor(
		private httpService: HttpService,
		private storageService: StorageService,
		private router: Router,
		private menu: MenuController,
	) {}

	loginUser(data: ILogin): Observable<any> {
		// return this.httpService.Post(data, 'auth')
		return this.httpService.Post(data, 'auth/login')
	}

	/**
	 * Enviamos registro de usuario a Web service
	 * @param registro = Interface con la data a registrar
	 */
	registerUser(data: IRegisterUser): Observable<any> {
		// return this.httpService.Post(data, 'users')
		return this.httpService.Post(data, 'mbusers')
	}

	codigoVerificacion(data: any): Observable<any> {
		// return this.httpService.Post(data, 'users/mail')
		return this.httpService.Post(data, 'mbusers/mail')
	}

	updatePassword(id: number, password: string) {
		return this.httpService.Put({ usrPassword: password }, `passmbusers/${id}`)
	}

	/**
	 * Validacion Asyncrona
	 * @param email Email a validar
	 */
	checkEmail(email: string) {
		return this.httpService.Get(`/checkEmail/anroswell@gmail.com`)
		// return of({ isEmailAvailable: email !== 'anroswell@gmail.com' })
	}

	async isAuth(): Promise<boolean> {
		const result = await this.storageService.read('_token')
		return result
	}

	logout(): boolean {
		this.storageService.clear()
		this.menu.enable(false)
		this.router.navigate(['/login'])
		return true
	}
}
