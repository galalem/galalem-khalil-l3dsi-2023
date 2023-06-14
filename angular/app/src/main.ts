import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { BREADService } from 'ngx-core';
import { BACKEND_URL } from './application.properties';

BREADService.BASE_URL = BACKEND_URL;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
