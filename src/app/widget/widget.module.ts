import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { ChartWidgetModule } from './chart-widget/chart-widget.module';
import { WidgetManagerComponent } from './widget-manager/widget-manager.component';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [WidgetListComponent, WidgetManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    WidgetRoutingModule,
    ChartWidgetModule,
  ],
})
export class WidgetModule {}
