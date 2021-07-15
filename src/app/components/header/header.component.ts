import { Component, Input, OnInit } from '@angular/core'
import { StorageService } from 'src/app/services/storage.service'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	public usuarioName: string
	public user: any
	constructor(private storage: StorageService) {
		this.user = this.storage.read('userLogin')

		this.usuarioName = `${this.user.usrNames} ${this.user.usrLastNames}`
	}

	ngOnInit() {}
}
