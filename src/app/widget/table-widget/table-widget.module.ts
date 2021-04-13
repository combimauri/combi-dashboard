import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableWidgetComponent } from './table-widget.component';
import { NgZorroAntdModule } from '../../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [TableWidgetComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [TableWidgetComponent],
})
export class TableWidgetModule {}
