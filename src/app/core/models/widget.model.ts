import { Type } from '@angular/core';

import { WidgetComponent } from './widget-component.model';
import { WidgetType } from './widget-type.enum';

export interface Widget {
  id: string;
  name: string;
  type: WidgetType;
  componentType?: Type<WidgetComponent>;
  description?: string;
}
