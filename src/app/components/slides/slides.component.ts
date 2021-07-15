import { CheckconnectionService } from './../../services/checkconnection.service'
import { Router } from '@angular/router'
import { HttpService } from './../../services/http.service'
import { Component, OnInit } from '@angular/core'

import { ISliders } from './../../Interfaces/interfaces'
import { UtilsService } from './../../services/utils.service'

import { environment } from './../../../environments/environment'
import { MenuController } from '@ionic/angular'
const { server } = environment

@Component({
	selector: 'app-slides',
	templateUrl: './slides.component.html',
	styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
	public slideOpts = {
		speed: 400,
	}
	public sliders: ISliders[]
	public server = server
	constructor(
		private httpService: HttpService,
		private router: Router,
		private utilService: UtilsService,
		private checkconnectionService: CheckconnectionService,
		private menu: MenuController,
	) {
		this.menu.enable(false)
	}

	ngOnInit() {
		this.getSliders()
	}

	/**
	 * Validamos si mostrar los Sliders
	 */
	private getSliders() {
		this.checkconnectionService.CheckConection().then(async (_) => {
			await this.utilService.presentLoading()
			this.httpService.Get('sliders').subscribe((resp) => {
				if (parseInt(resp.body[0].estado, 10) === 1) {
					this.sliders = resp.body
				} else {
					this.router.navigate(['/login'])
				}
			})
		})
	}
}
