import { Injectable, Type } from '@angular/core';

import { cloneDeep } from 'lodash';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { Widget } from '../models/widget.model';
import { WidgetComponent } from '../models/widget-component.model';
import { WidgetType } from '../models/widget-type.enum';
import { CalendarWidgetComponent } from '../../widget/widget-types/calendar-widget/calendar-widget.component';
import { LineChartWidgetComponent } from '../../widget/widget-types/line-chart-widget/line-chart-widget.component';
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
      name: 'Line Chart Widget',
      description: 'This is a line chart widget',
      type: WidgetType.LINE_CHART,
    },
    {
      id: 'd6acbe4a-a38f-4a41-b3df-69148d4acfaa',
      name: 'Table Widget',
      description: 'This is a table widget',
      type: WidgetType.TABLE,
    },
  ];
  private widgetTypes: {
    [type: string]: { label: string; componentType: Type<WidgetComponent> };
  } = {
    [WidgetType.CALENDAR]: {
      label: 'Calendar',
      componentType: CalendarWidgetComponent,
    },
    [WidgetType.LINE_CHART]: { label: 'Line Chart', componentType: LineChartWidgetComponent },
    [WidgetType.LIST]: { label: 'List', componentType: ListWidgetComponent },
    [WidgetType.TABLE]: { label: 'Table', componentType: TableWidgetComponent },
    [WidgetType.TIMELINE]: {
      label: 'Timeline',
      componentType: TimelineWidgetComponent,
    },
  };

  getWidget(id: string): Observable<Widget | undefined> {
    return timer(500).pipe(
      map(() => {
        const selectedWidget = this.widgetList.find(
          (widget) => widget.id === id
        );

        if (selectedWidget) {
          return { ...selectedWidget };
        }

        return selectedWidget;
      })
    );
  }

  getWidgetList(): Observable<Array<Widget>> {
    return timer(500).pipe(
      map(() =>
        cloneDeep(this.widgetList).map((widget) => {
          widget.componentType = this.getWidgetComponentType(widget.type);

          return widget;
        })
      )
    );
  }

  getWidgetDataList(): Array<{ label: string; type: WidgetType }> {
    const result: Array<{ label: string; type: WidgetType }> = [];

    Object.keys(this.widgetTypes)
      .map((type) => {
        return type as WidgetType;
      })
      .forEach((type) => {
        result.push({
          label: this.widgetTypes[type].label,
          type,
        });
      });

    return result;
  }

  getWidgetTypes(): {
    [type: string]: { label: string; componentType: Type<WidgetComponent> };
  } {
    return this.widgetTypes;
  }

  getWidgetComponentType(type: WidgetType): Type<WidgetComponent> {
    return this.widgetTypes[type]?.componentType;
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
