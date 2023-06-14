import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BREADService } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';
import { PageCommonService } from 'src/app/template/page/page-common.service';
import { SecurityService } from 'src/app/services/security-api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends PageComponent<any> {

  profile:any = {
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    full_name: "",
    username: "",
    role: ""
  }

  constructor(
    service: PageCommonService,
    api: BREADService<any>,
    router: Router,
    route: ActivatedRoute,
    element: ElementRef,
    dialog: MatDialog,
    security:SecurityService,
    cdref: ChangeDetectorRef
  ){
    super(service, api, router, route, element, dialog, cdref);
    security.userinfo().subscribe((userinfo) => {
      this.profile = userinfo;
    });
  }
}
