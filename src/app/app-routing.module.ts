import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./index/index.module').then((m) => m.IndexPageModule),
	},
	{
		path: '',
		loadChildren: () => import('./main/main.module').then((m) => m.MainPageModule),
	},
	{
		path: 'logout',
		loadChildren: () => import('./pages/logins/login/login.module').then((m) => m.LoginPageModule),
	},
	{
		path: 'forgot-password',
		loadChildren: () =>
			import('./pages/logins/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
	},
	{
		path: 'register',
		loadChildren: () => import('./pages/logins/register/register.module').then((m) => m.RegisterPageModule),
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	},
]

@NgModule({
	//imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], //Para Movil
	imports: [RouterModule.forRoot(routes, { useHash: true })], //Para Web
	exports: [RouterModule],
})
export class AppRoutingModule {}
