import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BREADService } from 'ngx-core';
import { AppCommonService } from 'src/app/app.service';
import { PersonDetails } from '../generic/details.page';
import { Staff } from 'ngx-core';

@Component({
  selector: 'staff-details',
  template: `
<ion-content>
<div class="card card-light mb-0" style="border-radius: 0;">
    <div class="card-header" *ngIf="alert">
      <app-alert #alert></app-alert>
    </div>
    <div class="card-body">
      <div class="row">
        <person-about [person]="entity" />
        <person-identity [person]="entity" />
        <person-contact [person]="entity" />
      </div>
    </div>
    <div class="card-footer">
        Dernière mise à jour {{entity.latestUpdate()}}
    </div>
</div>
</ion-content>
  `,
})
export class DetailsPage extends PersonDetails<Staff> {

  protected override onCreate(): void {
    this.entity = new Staff;
  }

  protected override get ref(): string {
    return "staffs";
  }

  protected override get listSelector(): string {
    return "staff-list";
  }
  
  copy(destination:Staff, original: Staff) {
    Staff.copy(original, destination);
  }
}
