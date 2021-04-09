import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetListComponent } from './widget-list/widget-list.component';
import { WidgetComponent } from './widget/widget.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetListComponent,
  },
  {
    path: ':id',
    component: WidgetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetRoutingModule {}
