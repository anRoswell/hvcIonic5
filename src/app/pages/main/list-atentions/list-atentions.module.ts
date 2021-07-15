import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ListAtentionsPageRoutingModule } from './list-atentions-routing.module'

import { ListAtentionsPage } from './list-atentions.page'

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ListAtentionsPageRoutingModule, ReactiveFormsModule],
	declarations: [ListAtentionsPage],
})
export class ListAtentionsPageModule {}
