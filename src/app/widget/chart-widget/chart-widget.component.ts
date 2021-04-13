import { Component } from '@angular/core';

import * as Highcharts from 'highcharts';
import { timer } from 'rxjs';

import { WidgetComponent } from '../../core/models/widget-component.model';

type HighchartsChart = any;

@Component({
  selector: 'combi-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
})
export class ChartWidgetComponent implements WidgetComponent {
  chartInstance: HighchartsChart;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [
      {
        data: [1, 2, 3],
        type: 'line',
      },
    ],
  };

  saveChartInstance = (instance: HighchartsChart): void => {
    this.chartInstance = instance;
    // tslint:disable-next-line: semicolon
  };

  reflow(): void {
    timer(100).subscribe(() => {
      this.chartInstance.reflow();
    });
  }
}
