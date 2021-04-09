import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [DashboardListComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
