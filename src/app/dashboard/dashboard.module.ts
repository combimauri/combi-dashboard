import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GridsterModule } from 'angular-gridster2';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd';
import { WidgetContainerModule } from '../widget/widget-container/widget-container.module';

@NgModule({
  declarations: [DashboardListComponent, DashboardManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridsterModule,
    NgZorroAntdModule,
    DashboardRoutingModule,
    WidgetContainerModule,
  ],
})
export class DashboardModule {}
