import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TestModule } from './test/test.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SecurityService } from './services/security-api.service';
import { MapsModule } from './template/components/maps/maps.module';
import { 
  BREADService,

  AlertModule, 
  DetailsModule, 
  DialogModule, 
  DropdownMenuModule, 
  IconsModule,
  ImagesModule,
} from 'ngx-core';

import { AppComponent } from './app.component';
import { PreloaderComponent } from './template/preloader/preloader.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { ToolbarComponent } from './template/toolbar/toolbar.component';
import { FooterComponent } from './template/footer/footer.component';
import { BreadcrumbComponent } from './template/breadcrumb/breadcrumb.component';
import { ContainerComponent } from './template/container/container.component';
import { PageComponent } from './template/page/page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './auth/profile/profile.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import { AdministrationModule } from './administration/administration.module';
import { HumanResourcesModule } from './human-resources/human-resources.module';
import { NewsModule } from './news/news.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolingModule } from './schooling/schooling.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GradingModule } from './grading/grading.module';

import { ContextMenuComponent } from './template/context-menu/context-menu.component';
import { AdminDashboardComponent } from './dashboard/admin/admin.component';
import { AgeChartDirective } from './template/components/chart/age-chart.directive';
import { GenderChartDirective } from './template/components/chart/gender-chart.directive';
import { ClockComponent } from './template/components/clock/clock.component';
import { WeatherComponent } from './template/components/weather/weather.component';
import { KEYCLOAK_URL } from 'src/application.properties';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: KEYCLOAK_URL,
        realm: 'ngx',
        clientId: 'angular-web-app'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      shouldAddToken: (request) => {
        const { method, url } = request;
    
        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['/test'];
        const isAcceptablePathMatch = acceptablePaths.some((path) => url.includes(path));
    
        return !(isGetRequest && isAcceptablePathMatch);
      },
      bearerExcludedUrls: ['/assets', '/clients/public'],
      shouldUpdateToken: (request) => {
        return true;
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    SidebarComponent,
    ToolbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    ContainerComponent,
    PageComponent,
    DashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    ContextMenuComponent,
    AgeChartDirective,
    GenderChartDirective,
    ClockComponent,
    WeatherComponent,
  ],
  imports: [
    TestModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    HttpClientModule,
    IconsModule,
    DialogModule,
    MatDialogModule,
    DropdownMenuModule,
    AlertModule,
    MapsModule,
    ImagesModule,
    DetailsModule,
    IonicModule.forRoot({mode: "ios"}),
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    AdministrationModule,
    HumanResourcesModule,
    NewsModule,
    SchoolingModule,
    ScheduleModule,
    GradingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    BREADService,
    SecurityService,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-Fr'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
