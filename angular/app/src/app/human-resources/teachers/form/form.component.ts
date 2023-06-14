import { Component } from '@angular/core';
import { SelectOption } from 'ngx-core';
import { Contract, Rank, Teacher } from '../teacher.entity';
import { FormComponent as PersonForm } from '../../generic/form.component';

@Component({
  selector: 'teacher-form',
  templateUrl: './form.component.html',
})
export class FormComponent extends PersonForm<Teacher> {

  override onCreate() {
    this.entity = new Teacher;
    this.initialize("teachers", "teacher-form", "teacher-list");
  }

  copy(destination:Teacher, original: Teacher) {
    Teacher.copy(original, destination);
  }

  override getFormData():FormData{
    let formData = super.getFormData();

    formData.append("dateOfRecruitment", this.entity.dateOfRecruitment?.substring(0, 10));
    formData.append("typeOfContract", this.entity.typeOfContract);
    if(this.entity.rank) formData.append("rank", this.entity.rank);
    if(this.entity.title) formData.append("title", this.entity.title);

    return formData;
  }

  CONTRACT_OPTIONS:SelectOption[] = [
    {value: Contract.PERMANENT, label: 'Titulaire'}, 
    {value: Contract.CONTRACTOR, label: 'Vacataire'}, 
  ];

  RANK_OPTIONS:SelectOption[] = [
    {value: Rank.RANK_1, label: 'Grade 1'}, 
    {value: Rank.RANK_2, label: 'Grade 2'}, 
  ];
}
