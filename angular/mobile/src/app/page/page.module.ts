import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppPage, LoadingPage } from './page.component';
import { BREADService, DropdownMenuModule, IconsModule, ImagesModule } from 'ngx-core';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PreloaderModule } from '../preloader/preloader.module';

class ReuseStrategy extends IonicRouteStrategy {
  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesModule,
    RouterModule,
    IconsModule,
    MatDialogModule,
    MatExpansionModule,
    DropdownMenuModule,
    PreloaderModule
  ],
  providers: [
    BREADService,
    { provide: RouteReuseStrategy, useClass: ReuseStrategy }
  ],
  declarations: [AppPage, LoadingPage, ContextMenuComponent],
  exports: [AppPage, LoadingPage]
})
export class PageModule {}
