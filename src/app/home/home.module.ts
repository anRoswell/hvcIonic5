import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

import { HomePage } from './home.page'
import { HomeRouter } from './home.router'
import { MenuModule } from '../commons/menu.module'

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, HomeRouter, MenuModule],
	declarations: [HomePage],
})
export class HomePageModule {}
