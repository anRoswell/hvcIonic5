import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MainPage } from './main.page'

const routes: Routes = [
	{
		path: 'main',
		component: MainPage,
		children: [
			{
				path: 'list',
				loadChildren: () => import('./../pages/main/list/list.module').then((m) => m.ListPageModule),
			},
			{
				path: 'list-atentions',
				loadChildren: () =>
					import('./../pages/main/list-atentions/list-atentions.module').then((m) => m.ListAtentionsPageModule),
			},
			{
				path: 'main-form',
				loadChildren: () => import('./../pages/main/main-form/main-form.module').then((m) => m.MainFormPageModule),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainPageRoutingModule {}
