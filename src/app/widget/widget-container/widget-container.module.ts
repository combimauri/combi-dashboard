import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetContainerComponent } from './widget-container.component';
import { ChartWidgetModule } from '../widget-types/chart-widget/chart-widget.module';
import { TableWidgetModule } from '../widget-types/table-widget/table-widget.module';
import { NgZorroAntdModule } from '../../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [WidgetContainerComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ChartWidgetModule,
    TableWidgetModule,
  ],
  exports: [WidgetContainerComponent],
})
export class WidgetContainerModule {}
