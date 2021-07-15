import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { HomePage } from './home.page'
import { LoginGuard } from '../guards/login.guard'

// Here import the user authenticated pages.
const routes: Routes = [
	{
		path: 'home',
		component: HomePage,
		children: [
			// {
			// 	path: 'encuentranos',
			// 	canActivate: [LoginGuard],
			// 	loadChildren: () => import('./../pages/tabs/meet-as/meet-as.module').then((m) => m.MeetAsPageModule),
			// },
			{
				path: '**',
				canActivate: [LoginGuard],
				redirectTo: '/login',
				pathMatch: 'full',
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRouter {}
