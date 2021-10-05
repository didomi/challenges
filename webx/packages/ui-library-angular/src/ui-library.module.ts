import { NgModule, ModuleWithProviders, APP_INITIALIZER, NgZone } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

import { DIRECTIVES } from './directives/proxy-list';
import { appInitialize } from './app-initialize';

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [CommonModule],
  exports: [...DIRECTIVES,],
})
export class UILibraryModule {
  static forRoot(): ModuleWithProviders<UILibraryModule> {
    return {
      ngModule: UILibraryModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appInitialize,
          multi: true,
          deps: [DOCUMENT, NgZone],
        },
      ],
    };
  }
}
