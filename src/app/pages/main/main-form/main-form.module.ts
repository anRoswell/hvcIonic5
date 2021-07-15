import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { MainFormPageRoutingModule } from './main-form-routing.module'

import { MainFormPage } from './main-form.page'

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, MainFormPageRoutingModule, ReactiveFormsModule],
	declarations: [MainFormPage],
})
export class MainFormPageModule {}
