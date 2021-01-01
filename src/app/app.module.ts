import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SafeDialComponent } from './safe-dial/safe-dial.component';
import { SevenSegmentDisplayComponent } from './seven-segment-display/seven-segment-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeDialComponent,
    SevenSegmentDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
