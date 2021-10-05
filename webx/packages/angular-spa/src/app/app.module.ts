import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UILibraryModule } from 'ui-library-angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UILibraryModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
