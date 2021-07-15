import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowpicturePageRoutingModule } from './showpicture-routing.module';

import { ShowpicturePage } from './showpicture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowpicturePageRoutingModule
  ],
  declarations: [ShowpicturePage]
})
export class ShowpicturePageModule {}
