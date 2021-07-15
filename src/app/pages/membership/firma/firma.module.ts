import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirmaPageRoutingModule } from './firma-routing.module';

import { FirmaPage } from './firma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirmaPageRoutingModule
  ],
  declarations: [FirmaPage]
})
export class FirmaPageModule {}
