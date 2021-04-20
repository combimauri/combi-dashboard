import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';

import { LineChartWidgetComponent } from './line-chart-widget.component';

@NgModule({
  declarations: [LineChartWidgetComponent],
  imports: [CommonModule, HighchartsChartModule],
  exports: [LineChartWidgetComponent],
})
export class LineChartWidgetModule {}
