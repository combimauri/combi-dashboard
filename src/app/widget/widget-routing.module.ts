import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetListComponent } from './widget-list/widget-list.component';
import { WidgetManagerComponent } from './widget-manager/widget-manager.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetListComponent,
  },
  {
    path: ':id',
    component: WidgetManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetRoutingModule {}
