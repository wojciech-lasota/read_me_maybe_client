import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedMainComponent } from './logged-main.component';
import { UnLoggedMainComponent } from './un-logged-main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoggedMainComponent,
    UnLoggedMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
