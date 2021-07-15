import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'
import { of, Observable, throwError } from 'rxjs'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'

import { ApiNodeJs } from '../../environments/environment'
import { UtilsService } from './utils.service'
import { IRegisterUser, ILogin } from '../Interfaces/interfaces'

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	apiUrlNodeJs = ApiNodeJs
	httpOptions = {
		headers: new HttpHeaders({
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}),
	}

	constructor(private http: HttpClient, private util: UtilsService) {}

	public Get(rutaApi: string): Observable<any> {
		const APIREST = `${ApiNodeJs}${rutaApi}`
		return this.http.get<any>(APIREST, this.httpOptions).pipe(
			// catchError(this.handleError),
			tap((resp) => {
				of(resp)
			}),
		)
	}

	public GetParams(rutaApi: string, params: HttpParams): Observable<any> {
		const APIREST = `${ApiNodeJs}${rutaApi}`

		return this.http
			.get<any>(APIREST, { params, headers: this.httpOptions.headers })
			.pipe(
				// catchError(this.handleError),
				tap((resp) => {
					of(resp)
				}),
			)
	}

	/**
	 * httpPost generico para todas las consulta
	 * @param body data
	 * @param opcion indica si se llama al backend csharp o nodeJs
	 * @param rutaApi ruta del backend
	 */
	public Post(
		body: object | ILogin | IRegisterUser = {},
		rutaApi: string = '',
		opcion: string = 'node',
	): Observable<any> {
		const APIREST = this.apiRest(rutaApi, opcion)
		return this.http.post<any>(`${APIREST}`, JSON.stringify(body), this.httpOptions).pipe(tap((resp) => of(resp)))
	}

	/**
	 * httpPost generico para todas las consulta
	 * @param body data
	 * @param opcion indica si se llama al backend csharp o nodeJs
	 * @param rutaApi ruta del backend
	 */
	public PostFormData(formData: FormData, rutaApi: string): Observable<any> {
		const APIREST = this.apiRest(rutaApi, 'nodejs')
		return this.http.post<any>(`${APIREST}`, formData).pipe(tap((resp) => of(resp)))
	}

	/**
	 * Metodo httpDelete generico
	 * @param rutaApi ruta a ser llamada
	 */
	public Delete(rutaApi: string, opcion: string = 'node'): Observable<any> {
		const APIREST = this.apiRest(rutaApi, opcion)
		// console.log(APIREST)
		return this.http.delete<any>(`${ApiNodeJs}${rutaApi}`, this.httpOptions).pipe(tap((data) => of(data)))
	}

	/**
	 * Realiza paticion http de tipo PUT
	 * @param urlApi url del backend
	 * @param body data a enviar
	 */
	public Put(body: object, rutaApi: string = '', opcion: string = 'node') {
		const APIREST = this.apiRest(rutaApi, opcion)
		// console.log(APIREST)
		// console.log(body)
		return this.http.put(APIREST, body, this.httpOptions).pipe(tap((data) => of(data)))
	}

	/**
	 * Para el manejo de errores
	 * @param error error generado
	 */
	private handleError(error: HttpErrorResponse) {
		return throwError('Ups algo paso...')
	}

	private apiRest(rutaApi: string, opcion: any) {
		return `${ApiNodeJs}${rutaApi}`
	}
}
