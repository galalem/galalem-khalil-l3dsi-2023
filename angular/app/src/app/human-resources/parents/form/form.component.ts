import { Component } from '@angular/core';
import { SelectOption } from 'ngx-core';
import { Parent, MaritalStatus } from '../parent.entity';
import { FormComponent as PersonForm } from '../../generic/form.component';

@Component({
  selector: 'parent-form',
  templateUrl: './form.component.html',
})
export class FormComponent extends PersonForm<Parent> {

  override onCreate() {
    this.entity = new Parent;
    this.initialize("parents", "parent-form", "parent-list")
  }
  
  copy(destination:Parent, original: Parent) {
    Parent.copy(original, destination);
  }

  override getFormData():FormData{
    let formData = super.getFormData();

    formData.append("profession", this.entity.profession);
    formData.append("organisation", this.entity.organisation);
    formData.append("maritalStatus", this.entity.maritalStatus);

    return formData;
  }

  MARITAL_STATUS_OPTIONS:SelectOption[] = [
    {value: MaritalStatus.SINGLE, label: "Célibataire"}, 
    {value: MaritalStatus.MARRIED, label: "Marié(e)"}, 
    {value: MaritalStatus.DIVORCED, label: "Divorcé(e)"}, 
    {value: MaritalStatus.WIDOWED, label: "Veuf(ve)"}, 
  ];
}