import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';

import { en_US } from 'ng-zorro-antd/i18n';
import { NZ_I18N } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { IconsProviderModule } from './icons-provider/icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd/ng-zorro-antd';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    IconsProviderModule,
    NgZorroAntdModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
