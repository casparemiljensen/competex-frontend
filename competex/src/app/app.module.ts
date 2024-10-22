// this file is not currently used in the applicaiton due to reason of not beeing sure it it is nessary 

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent // Traditional component
  ],
  imports: [
    BrowserModule,
    // MyStandaloneComponent // Import the standalone component here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
