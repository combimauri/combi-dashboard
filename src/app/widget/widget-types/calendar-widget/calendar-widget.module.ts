import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarWidgetComponent } from './calendar-widget.component';
import { NgZorroAntdModule } from '../../../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [CalendarWidgetComponent],
  imports: [CommonModule, FormsModule, NgZorroAntdModule],
  exports: [CalendarWidgetComponent],
})
export class CalendarWidgetModule {}
