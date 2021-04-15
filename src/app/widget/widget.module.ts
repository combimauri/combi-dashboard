import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { WidgetManagerComponent } from './widget-manager/widget-manager.component';
import { WidgetEditorComponent } from './widget-manager/widget-editor/widget-editor.component';
import { CalendarWidgetModule } from './widget-types/calendar-widget/calendar-widget.module';
import { ChartWidgetModule } from './widget-types/chart-widget/chart-widget.module';
import { ListWidgetModule } from './widget-types/list-widget/list-widget.module';
import { TableWidgetModule } from './widget-types/table-widget/table-widget.module';
import { TimelineWidgetModule } from './widget-types/timeline-widget/timeline-widget.module';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [
    WidgetListComponent,
    WidgetManagerComponent,
    WidgetEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    WidgetRoutingModule,
    CalendarWidgetModule,
    ChartWidgetModule,
    ListWidgetModule,
    TableWidgetModule,
    TimelineWidgetModule,
  ],
})
export class WidgetModule {}
