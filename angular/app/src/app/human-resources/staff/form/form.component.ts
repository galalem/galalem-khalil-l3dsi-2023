import { Component } from '@angular/core';
import { SelectOption } from 'ngx-core';
import { Staff, Contract, Role } from '../staff.entity';
import { FormComponent as PersonForm } from '../../generic/form.component';

@Component({
  selector: 'staff-form',
  templateUrl: './form.component.html',
})
export class FormComponent extends PersonForm<Staff> {

  override onCreate() {
    this.entity = new Staff;
    this.initialize("staff", "staff-form", "staff-list")
  }

  copy(destination:Staff, original: Staff) {
    Staff.copy(original, destination);
  }

  override getFormData():FormData{
    let formData = super.getFormData();

    formData.append("dateOfRecruitment", this.entity.dateOfRecruitment?.substring(0, 10));
    formData.append("typeOfContract", this.entity.typeOfContract);
    formData.append("role", this.entity.role);
    formData.append("function", this.entity.function);
    formData.append("mailer", this.entity.mailer);

    return formData;
  }

  CONTRACT_OPTIONS:SelectOption[] = [
    {value: Contract.PERMANENT, label: 'Titulaire'}, 
    {value: Contract.CONTRACTOR, label: 'Vacataire'}, 
  ];

  ROLE_OPTIONS:SelectOption[] = [
    {value: Role.ROLE_1, label: 'Role 1'}, 
    {value: Role.ROLE_2, label: 'Role 2'}, 
    {value: Role.ROLE_3, label: 'Role 3'}, 
  ];
}