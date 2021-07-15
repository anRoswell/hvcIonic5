import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CheckconnectionService } from 'src/app/services/checkconnection.service'
import { HttpService } from 'src/app/services/http.service'
import { StorageService } from 'src/app/services/storage.service'

@Component({
	selector: 'app-list',
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
	public patients = []
	constructor(
		private reouter: Router,
		private httpService: HttpService,
		private checkconnectionService: CheckconnectionService,
		private storageService: StorageService,
	) {}

	ngOnInit() {
		this.getPatients()
	}

	getPatients() {
		this.checkconnectionService.CheckConection().then(async (_) => {
			this.httpService.Get('patients').subscribe((resp) => {
				this.patients = resp
			})
		})
	}

	registerConsultPatient(patient) {
		this.storageService.save('patientSelected', patient)
		this.reouter.navigate(['./main/list-atentions'])
	}

	//#region SEARCH
	search(e: any) {
		console.log(e)
	}
	//#endregion SEARCH
}
