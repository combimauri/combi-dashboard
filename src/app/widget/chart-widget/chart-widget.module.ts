import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';

import { ChartWidgetComponent } from './chart-widget.component';

@NgModule({
  declarations: [ChartWidgetComponent],
  imports: [CommonModule, HighchartsChartModule],
  exports: [ChartWidgetComponent],
})
export class ChartWidgetModule {}
