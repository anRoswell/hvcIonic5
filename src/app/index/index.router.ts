import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { IndexPage } from './index.page'

// Create a router class and import unauthenticated pages here.
const routes: Routes = [
	{
		path: '',
		component: IndexPage,
		children: [
			// {
			// 	path: '',
			// 	loadChildren: () => import('./../pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
			// },
			{
				path: '',
				loadChildren: () => import('./../pages/logins/login/login.module').then((m) => m.LoginPageModule),
			},
			{
				path: 'login',
				loadChildren: () => import('./../pages/logins/login/login.module').then((m) => m.LoginPageModule),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class IndexRouter {}
