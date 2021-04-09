import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { WidgetComponent } from './widget/widget.component';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [WidgetListComponent, WidgetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    WidgetRoutingModule,
  ],
})
export class WidgetModule {}
