import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedMainComponent } from './logged-main.component';
import { UnLoggedMainComponent } from './un-logged-main.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './shared/guards/is-not-authenticated.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';

@NgModule({
  declarations: [AppComponent, LoggedMainComponent, UnLoggedMainComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    IsAuthenticatedGuard,
    IsNotAuthenticatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
