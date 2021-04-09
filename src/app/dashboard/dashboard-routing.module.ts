import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardListComponent,
  },
  {
    path: ':id',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
