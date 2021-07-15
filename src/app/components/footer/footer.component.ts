import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	@Input() usuarioName: string
	public imgSyspotec = './../../../assets/img/logo.png'
	constructor() {}

	ngOnInit() {}
}
