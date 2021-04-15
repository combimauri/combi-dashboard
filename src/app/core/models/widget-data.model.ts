import { Type } from '@angular/core';

import { WidgetComponent } from './widget-component.model';

export enum WidgetType {
  CALENDAR = 'Calendar',
  CHART = 'Chart',
  LIST = 'List',
  TABLE = 'Table',
  TIMELINE = 'Timeline',
}

export interface WidgetData {
  widgetType: WidgetType;
  componentType: Type<WidgetComponent>;
}
