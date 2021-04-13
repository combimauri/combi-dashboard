import { Type } from '@angular/core';

import { WidgetComponent } from './widget-component.model';

export interface Widget {
  id: string;
  name: string;
  type: Type<WidgetComponent>;
  description?: string;
}
