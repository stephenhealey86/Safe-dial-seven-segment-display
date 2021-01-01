import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SafeDialComponent } from './safe-dial/safe-dial.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeDialComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
