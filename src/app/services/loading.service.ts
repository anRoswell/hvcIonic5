import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	public isLoading: BehaviorSubject<any> = new BehaviorSubject(false)
	constructor() {}
}
