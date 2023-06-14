import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PageCommonService } from './page-common.service';
import { Page, BREADService } from 'ngx-core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page',
  template: '<p>page works!</p>',
})
export class PageComponent<Model> extends Page<Model> {

  constructor(
    protected service: PageCommonService,
    http: BREADService<Model>,
    protected router: Router,
    route: ActivatedRoute,
    element: ElementRef,
    protected dialog: MatDialog,
    protected cdref: ChangeDetectorRef
  ){ 
    super(service, http, route, element);
    this.onCreate();
  }

  protected onCreate() {
    // called within constructor so it can be called without redefining all args
  }

  protected navigate(commands: any[], extras?: NavigationExtras | undefined): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }

  protected detectChanges() {
    this.cdref.detectChanges();
  }

  /* -- Common Icons -- */
  EmailIcon = "envelope";
  PhoneIcon = "phone";
  AddressIcon = "map-location-dot"
  GPSIcon = "location-crosshairs";
  NoteIcon = "note-sticky";

  ViewIcon = "eye";
  EditIcon = "pen-to-square";
  DeleteIcon = "trash";



  override ngOnDestroy():void {
    super.ngOnDestroy();
    this.service.setUsesContext(false);
    this.service.setUsesMode(false);    
  }
}
