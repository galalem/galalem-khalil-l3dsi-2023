import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BREADService, Teacher } from 'ngx-core';
import { AppCommonService } from 'src/app/app.service';
import { PersonDetails } from '../generic/details.page';

@Component({
  selector: 'teacher-details',
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
export class DetailsPage extends PersonDetails<Teacher> {

  protected override onCreate(): void {
    this.entity = new Teacher;
  }

  protected override get ref(): string {
    return "teachers";
  }

  protected override get listSelector(): string {
    return "teacher-list";
  }
  
  copy(destination:Teacher, original: Teacher) {
    Teacher.copy(original, destination);
  }
}