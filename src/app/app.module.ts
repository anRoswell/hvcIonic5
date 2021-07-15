import { NgModule } from '@angular/core'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { TokenInterceptor } from './interceptors/token.interceptor'
import { LoadingInterceptor } from './interceptors/loading.interceptor'

import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'

import { CallNumber } from '@ionic-native/call-number/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
	providers: [
		StatusBar,
		SplashScreen,
		Base64ToGallery,
		AndroidPermissions,
		CallNumber,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
		FileOpener,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
