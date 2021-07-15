import { Injectable } from '@angular/core'
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'

import { AuthenticateService } from '../services/authenticate.service'

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate {
	constructor(private auth: AuthenticateService) {}

	async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		return (await this.auth.isAuth()) ? true : this.auth.logout()
	}
}
