import { Component, OnInit } from '@angular/core'

import { MenuController, Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
	public selectedIndex = 0
	public appPages = [
		{
			title: 'Home',
			url: '/home/servicios',
			icon: 'home',
		},
		{
			title: 'Contactenos',
			url: '/home/contactanos',
			icon: 'mail',
		},
		// {
		// 	title: 'Ubiquenos',
		// 	url: '/home/encuentranos',
		// 	icon: 'pin',
		// },
		{
			title: 'Salir',
			url: 'logout',
			icon: 'close-circle',
		},
	]
	public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private menu: MenuController,
	) {
		this.initializeApp()
	}

	ngOnInit() {
		this.menu.enable(false)
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault()
			this.splashScreen.hide()
		})
	}
}
