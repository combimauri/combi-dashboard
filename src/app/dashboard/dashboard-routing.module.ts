import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardListComponent,
  },
  {
    path: ':id',
    component: DashboardManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
