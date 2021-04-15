import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListWidgetComponent } from './list-widget.component';
import { NgZorroAntdModule } from '../../../ng-zorro-antd/ng-zorro-antd';

@NgModule({
  declarations: [ListWidgetComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [ListWidgetComponent],
})
export class ListWidgetModule {}
