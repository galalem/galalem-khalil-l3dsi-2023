import { Component } from '@angular/core';
import { Staff } from 'ngx-core';
import { DetailsComponent as PersonDetails } from '../generic/details.component';


@Component({
  selector: 'staff-details',
  template: `
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <app-alert #alert></app-alert>
        </div>
        <div class="col-12">
            <div class="card card-light">
                <div class="card-header">
                    <h3 class="card-title" style="line-height: 1.5;">Détails</h3>
                    <div class="card-tools no-print">
                        <person-menu [person]="entity" [readonly]="false" [profile]="'/human-resources/' + ref"></person-menu>
                    </div>
                </div>
                <div class="card-body">
                    <person-about [person]="entity"></person-about>
                    <person-identity [person]="entity"></person-identity>
                    <person-contact [person]="entity"></person-contact>
                </div>
                <div class="card-footer no-print">
                    Dernière mise à jour {{entity.latestUpdate()}}
                </div>
            </div>
        </div>
    </div>
</div>
  `,
})
export class DetailsComponent extends PersonDetails<Staff> {

  protected override onCreate(): void {
    this.entity = new Staff;
    this.initialize("staff", "staff-list", "ce personnel")

    this.before = [
      {
        title: "Informations Professionnelles",
        details: [
          {
            title: "Fonction",
            icon: "file-signature",
            text: this.entity.function
          },
          {
            title: "Role",
            icon: "tags",
            text: this.entity.localeRole()
          },
          {
            title: "Email Professionnel",
            icon: "envelope",
            text: this.entity.mailer
          },
        ]
      }
    ]
  }

  copy(original: Staff) {
    this.entity = Staff.copy(original);
  }
}

