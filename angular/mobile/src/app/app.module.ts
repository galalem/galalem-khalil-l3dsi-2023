import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KEYCLOAK_AUTH_PROVIDER } from './keycloak/auth.interceptor';
import { PageModule } from './page/page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, PageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, KEYCLOAK_AUTH_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
