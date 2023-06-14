import { Component, ViewChild } from '@angular/core';
import { Department } from '../department.entity';
import { PageComponent } from 'src/app/template/page/page.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'department-form',
  templateUrl: './form.component.html',
})
export class FormComponent extends PageComponent<Department> {

  @ViewChild('formCtrl', {static:false}) formCtrl:NgForm;
  entity:Department = new Department;

  override ngOnInit() {   
    this.init('administration/departments', 'administration/departments', 'department-list');
    let id = this.getRouteParam('id');
    if (id) 
      this.default().read(id, (response) => this.entity = response);
    super.ngOnInit();
  }

  submit() {

    if (this.formCtrl.invalid)
      return;

    console.log(this.entity);
    let formData = new FormData();
    formData.append("name", this.entity.name);
    formData.append("acronym", this.entity.acronym);
    if (this.entity.about) formData.append("about", this.entity.about);
    if (this.entity.email) formData.append("email", this.entity.email);
    if (this.entity.phone) formData.append("phone", this.entity.phone);
    

    if (this.entity.id)
      this.default().edit(this.entity.id, formData);
    else
      this.default().add(formData)

  }
}
