import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BREADService } from 'ngx-core';
import { AppCommonService } from 'src/app/app.service';
import { PersonDetails } from '../generic/details.page';
import { Student } from 'ngx-core';

@Component({
  selector: 'student-details',
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
        <student-contact [student]="entity" />
        <student-family [student]="entity" />
      </div>
    </div>
    <div class="card-footer">
        Dernière mise à jour {{entity.latestUpdate()}}
    </div>
</div>
</ion-content>
  `,
})
export class DetailsPage extends PersonDetails<Student> {

  protected override onCreate(): void {
    this.entity = new Student;
  }

  protected override get ref(): string {
    return "students";
  }

  protected override get listSelector(): string {
    return "student-list";
  }
  
  copy(destination:Student, original: Student) {
    Student.copy(original, destination);
  }
}
