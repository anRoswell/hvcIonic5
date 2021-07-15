import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainFormPage } from './main-form.page';

const routes: Routes = [
  {
    path: '',
    component: MainFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainFormPageRoutingModule {}
