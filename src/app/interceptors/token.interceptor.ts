import { Injectable } from '@angular/core'
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { map, switchMap, share, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { LoadingController, ToastController } from '@ionic/angular'

import { StorageService } from '../services/storage.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = []
	constructor(
		private storageService: StorageService,
		private router: Router,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
	) {}

	/**
	 * Remueve request segun solicitud y valida si cero finalizamos loading
	 * @param req = request generado
	 */
	removeRequest(req: HttpRequest<any>) {
		const i = this.requests.indexOf(req)
		if (i >= 0) {
			this.requests.splice(i, 1)
		}
		setTimeout(() => {
			if (this.requests.length === 0) {
				this.dismissLoading()
			}
		}, 0)
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Presentamos el Loading al inicio de la llamada
		this.requests.push(request)
		return of(this.storageService.read('_token')).pipe(
			switchMap((token: any) => {
				const requestClone = this.addToken(request, token)
				return next.handle(requestClone).pipe(
					share(),
					map((event: HttpEvent<any>) => {
						if (event instanceof HttpResponse) {
							this.removeRequest(request)
							token = event.headers.get('Authorization')
							if (token) {
								this.storageService.save('_token', token)
							}
						}
						return event
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						const { status } = errorResponse
						const { error } = errorResponse
						switch (status) {
							case 400:
								let mensaje400 = `[HTTP 404] Servidor no encontrado...`
								mensaje400 = error.body ? error.body : mensaje400
								this.presentErrorToast(mensaje400)
								break
							case 401:
							case 403:
								let mensaje401 = `[HTTP 404] Servidor no encontrado...`
								mensaje401 = error.body ? error.body : mensaje401
								this.presentErrorToast(mensaje401)
								this.storageService.clear()
								this.router.navigate(['/login'])
								break
							case 404:
								let mensaje404 = `[HTTP 404] Servidor no encontrado...`
								mensaje404 = error.body ? error.body : mensaje404
								this.presentErrorToast(mensaje404)
								break
							case 500:
								let mensaje500 = `[HTTP 500] Internal error...`
								mensaje500 = error.body ? error.body : mensaje500
								this.presentErrorToast(mensaje500)
								break
							default:
								if (error) {
									this.presentErrorToast(`Sin conexion con el servidor`)
								}
								break
						}
						this.removeRequest(request)
						return throwError(errorResponse)
					}),
				)
			}),
		)
	}

	/**
	 * Agrega token a la cabecera
	 * @param request = request genereado
	 * @param token = token obtenido
	 */
	private addToken(request: HttpRequest<any>, token: any): HttpRequest<any> {
		// Authentication by setting header with token value
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: token,
				},
			})
		}

		return request
	}

	/**
	 * Presenta el toast con mensaje
	 * @param msg = mensaje a mostrar
	 */
	async presentErrorToast(msg: string): Promise<void> {
		const toast = await this.toastCtrl.create({
			message: msg,
			duration: 6000,
			position: 'top',
			color: 'warning',
			cssClass: 'toast',
			buttons: [
				{
					text: 'Ok',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked')
					},
				},
			],
		})
		toast.present()
	}

	/**
	 * Finaliza loading
	 */
	async dismissLoading(): Promise<any> {
		this.loadingCtrl.getTop().then((hasLoading) => {
			if (hasLoading) {
				this.loadingCtrl.dismiss()
			}
		})
	}
}
