import { Component } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { MenuController } from '@ionic/angular'

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	navigate: any
	constructor(private menu: MenuController) {
		this.menu.enable(true)
		this.sideMenu()
	}
	openFirst() {
		this.menu.enable(true, 'first')
		this.menu.open('first')
	}

	openEnd() {
		this.menu.open('end')
	}

	openCustom() {
		this.menu.enable(true, 'custom')
		this.menu.open('custom')
	}

	sideMenu() {
		this.navigate = [
			{
				title: 'Home',
				url: '/home',
				icon: 'home',
			},
			{
				title: 'Chat',
				url: '/chat',
				icon: 'chatboxes',
			},
			{
				title: 'Contacts',
				url: '/contacts',
				icon: 'contacts',
			},
			{
				title: 'Close',
				url: '/logout',
				icon: 'contacts',
			},
		]
	}
}
