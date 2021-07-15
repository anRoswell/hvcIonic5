import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { StorageService } from '../services/storage.service'

@Injectable({
	providedIn: 'root',
})
export class IntroGuard implements CanActivate {
	constructor(private router: Router, private storageService: StorageService) {}

	async canActivate() {
		const isIntroShowed = await this.storageService.read('isIntroShowed')
		if (isIntroShowed) {
			return true
		} else {
			this.router.navigate(['home/encuentranos'])
			return false
		}
	}
}
