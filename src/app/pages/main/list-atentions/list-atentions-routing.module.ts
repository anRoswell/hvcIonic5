import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAtentionsPage } from './list-atentions.page';

const routes: Routes = [
  {
    path: '',
    component: ListAtentionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAtentionsPageRoutingModule {}
