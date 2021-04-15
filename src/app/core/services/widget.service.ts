import { Injectable } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { Widget } from '../models/widget.model';
import { WidgetType, WidgetData } from '../models/widget-data.model';
import { CalendarWidgetComponent } from '../../widget/widget-types/calendar-widget/calendar-widget.component';
import { ChartWidgetComponent } from '../../widget/widget-types/chart-widget/chart-widget.component';
import { ListWidgetComponent } from '../../widget/widget-types/list-widget/list-widget.component';
import { TableWidgetComponent } from '../../widget/widget-types/table-widget/table-widget.component';
import { TimelineWidgetComponent } from '../../widget/widget-types/timeline-widget/timeline-widget.component';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetList: Array<Widget> = [
    {
      id: '67677631-35b3-4411-aed5-aad67eadafc2',
      name: 'Chart Widget',
      description: 'This is a chart widget',
      type: ChartWidgetComponent,
    },
    {
      id: 'd6acbe4a-a38f-4a41-b3df-69148d4acfaa',
      name: 'Table Widget',
      description: 'This is a table widget',
      type: TableWidgetComponent,
    },
  ];
  private widgetDataList: Array<WidgetData> = [
    { widgetType: WidgetType.CALENDAR, componentType: CalendarWidgetComponent },
    { widgetType: WidgetType.CHART, componentType: ChartWidgetComponent },
    { widgetType: WidgetType.LIST, componentType: ListWidgetComponent },
    { widgetType: WidgetType.TABLE, componentType: TableWidgetComponent },
    { widgetType: WidgetType.TIMELINE, componentType: TimelineWidgetComponent },
  ];

  getWidget(id: string): Observable<Widget | undefined> {
    return timer(500).pipe(
      map(() => this.widgetList.find((widget) => widget.id === id))
    );
  }

  getWidgetList(): Observable<Array<Widget>> {
    return timer(500).pipe(map(() => this.widgetList));
  }

  getWidgetDataList(): Array<WidgetData> {
    return this.widgetDataList;
  }

  addWidget(widget: Widget): Observable<Widget> {
    return timer(500).pipe(
      map(() => {
        widget.id = uuidv4();

        this.widgetList.push(widget);

        return widget;
      })
    );
  }

  deleteWidget(id: string): void {
    const itemIndex = this.widgetList.findIndex((widget) => widget.id === id);

    if (itemIndex >= 0) {
      this.widgetList.splice(itemIndex, 1);
    }
  }
}
