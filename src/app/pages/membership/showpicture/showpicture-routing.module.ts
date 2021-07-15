import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowpicturePage } from './showpicture.page';

const routes: Routes = [
  {
    path: '',
    component: ShowpicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowpicturePageRoutingModule {}
