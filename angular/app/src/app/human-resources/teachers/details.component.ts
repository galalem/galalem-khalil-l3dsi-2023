import { Component } from '@angular/core';
import { Teacher } from 'ngx-core';
import { DetailsComponent as PersonDetails } from '../generic/details.component';


@Component({
  selector: 'teacher-details',
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
export class DetailsComponent extends PersonDetails<Teacher> {

  protected override onCreate(){
    this.entity = new Teacher;
    this.initialize("teachers", "teacher-list", "cet enseignant")

    this.before = [
      {
        title: "Informations Professionnelles",
        details: [
          {
            title: "Date de Recrutement",
            icon: "calendar-day",
            text: this.entity.dateOfRecruitment
          },
          {
            title: "Type de Contrat",
            icon: "file-signature",
            text: this.entity.localeTypeOfContract()
          },
          {
            title: "Grade",
            icon: "ranking-star",
            text: this.entity.localeRank()
          },
          {
            title: "Titre",
            icon: "tag",
            text: this.entity.title
          }
        ]
      }
    ]
  }

  copy(original: Teacher) {
    this.entity = Teacher.copy(original);
  }
}

