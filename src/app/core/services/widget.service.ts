import { Injectable } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { Widget } from '../models/widget.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetList: Array<Widget> = [
    {
      id: '67677631-35b3-4411-aed5-aad67eadafc2',
      name: 'Default Widget',
      description: 'This is the default widget',
    },
  ];

  getWidgetList(): Observable<Array<Widget>> {
    return timer(500).pipe(map(() => this.widgetList));
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
