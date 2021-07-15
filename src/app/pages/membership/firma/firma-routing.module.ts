import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmaPage } from './firma.page';

const routes: Routes = [
  {
    path: '',
    component: FirmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirmaPageRoutingModule {}
