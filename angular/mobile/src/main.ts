import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BREADService } from 'ngx-core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

BREADService.BASE_URL = "http://192.168.1.100:8100"

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(JSON.stringify(err)));
