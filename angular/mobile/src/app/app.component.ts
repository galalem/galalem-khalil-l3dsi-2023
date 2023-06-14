import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import OneSignalInit from './notifications/one-signal.config';
import { AppCommonService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(platform: Platform, service: AppCommonService) {
    platform.ready().then(() => {
      service.setLoading(true)
      OneSignalInit(() => service.setLoading(false));
    });

    if (window.matchMedia) {
      document.body.classList.toggle('dark-mode', window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }
}
