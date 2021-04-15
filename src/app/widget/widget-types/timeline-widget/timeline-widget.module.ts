import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineWidgetComponent } from './timeline-widget.component';
import { NgZorroAntdModule } from '../../../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [TimelineWidgetComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [TimelineWidgetComponent],
})
export class TimelineWidgetModule {}
