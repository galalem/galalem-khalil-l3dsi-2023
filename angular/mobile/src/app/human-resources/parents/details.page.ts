import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BREADService } from 'ngx-core';
import { AppCommonService } from 'src/app/app.service';
import { PersonDetails } from '../generic/details.page';
import { Parent } from 'ngx-core';

@Component({
  selector: 'parent-details',
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
export class DetailsPage extends PersonDetails<Parent> {

  protected override onCreate(): void {
    this.entity = new Parent;
  }

  protected override get ref(): string {
    return "parents";
  }

  protected override get listSelector(): string {
    return "parent-list";
  }
  
  copy(destination:Parent, original: Parent) {
    Parent.copy(original, destination);
  }
}
