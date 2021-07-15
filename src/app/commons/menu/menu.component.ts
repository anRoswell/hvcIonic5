import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	navigate: any
	constructor() {
		this.sideMenu()
	}

	ngOnInit() {}

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
