import { NgModule } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  exports: [NzLayoutModule, NzListModule, NzMenuModule, NzMessageModule],
})
export class NgZorroAntdModule {}
