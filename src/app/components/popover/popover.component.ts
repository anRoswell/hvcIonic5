import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NavParams, PopoverController } from '@ionic/angular'

import { IParametros } from './../../interfaces/interfaces'

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
	public servicioId: any
	public parametros: IParametros = { servicioId: '', serviceName: '', groupId: '' }
	constructor(private popover: PopoverController, private navParams: NavParams, private router: Router) {}

	ngOnInit() {
		this.parametros.groupId = this.navParams.data.groupId
		this.parametros.servicioId = this.navParams.data.servicioId
		this.parametros.serviceName = this.navParams.data.serviceName
	}

	dismissPopover() {
		if (this.popover) {
			this.popover.dismiss().then(() => {
				this.popover = null
			})
		}
	}

	newSolicitud() {
		this.dismissPopover()
		// const objeto = {
		// 	groupId: this.groupId,
		// 	servicioId: servicio.id,
		// 	serviceName: servicio.title,
		// }
		this.router.navigate(['servicios/nuevasolicitud', this.parametros.servicioId], {
			state: {
				member: JSON.stringify(this.parametros),
				type: 'reader',
			},
		})
	}
}
