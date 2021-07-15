import { HttpService } from './http.service'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class SendMailService {
	constructor(private httpService: HttpService) {}

	/**
	 * Se envia data para envio de mail para recuperar contraseña
	 * @param mail data q contiene email del usuario
	 */
	RecoveryPass(data: string) {
		return this.httpService.Post({ emailRecovery: data }, `auth/recoverypass`)
	}
}
