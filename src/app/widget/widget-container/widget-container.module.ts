import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridsterModule } from 'angular-gridster2';

import { WidgetContainerComponent } from './widget-container.component';
import { ChartWidgetModule } from '../chart-widget/chart-widget.module';
import { NgZorroAntdModule } from '../../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [WidgetContainerComponent],
  imports: [CommonModule, GridsterModule, NgZorroAntdModule, ChartWidgetModule],
  exports: [WidgetContainerComponent],
})
export class WidgetContainerModule {}
