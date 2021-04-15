import { Component } from '@angular/core';

import { NzCalendarMode } from 'ng-zorro-antd/calendar';

import { WidgetComponent } from '../../../core/models/widget-component.model';

@Component({
  selector: 'combi-calendar-widget',
  templateUrl: './calendar-widget.component.html',
  styleUrls: ['./calendar-widget.component.scss'],
})
export class CalendarWidgetComponent implements WidgetComponent {
  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  reflow(): void {}

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
