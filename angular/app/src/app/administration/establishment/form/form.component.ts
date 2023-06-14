import { Component, ViewChild } from '@angular/core';
import { Establishment } from '../establishment.entity';
import { PageComponent } from 'src/app/template/page/page.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'establishment-form',
  templateUrl: './form.component.html',
})
export class FormComponent extends PageComponent<Establishment> {

  @ViewChild('formCtrl', {static:false}) formCtrl:NgForm;
  entity: Establishment = new Establishment();
  logo:Array<File>;

  override ngOnInit() {  
    this.init('administration/establishment', 'administration/establishment', 'establishment-details');
    this.read('').subscribe((response) => {
      if (response) {
        this.entity = response;
      }
    });
    super.ngOnInit();
  }
  onFileError(error:string) {
    this.requestAlert(error, 400, "establishment-form");
  }

  toFormData() {
    let formData = new FormData();
    formData.append("name", this.entity.name);
    formData.append("acronym", this.entity.acronym);
    formData.append("about", this.entity.about);
    formData.append("email", this.entity.email);
    formData.append("phone", this.entity.phone);
    formData.append("phone2", this.entity.phone2);
    formData.append("address.street", this.entity.address.street);
    formData.append("address.city", this.entity.address.city);
    formData.append("address.state", this.entity.address.state);
    formData.append("address.country", this.entity.address.country);
    formData.append("address.code", this.entity.address.code);

    if (this.logo?.length === 1)
      formData.append("logo", this.logo[0]);

    return formData;
  }
  submit() {
    if (this.formCtrl.invalid)
      return;

    this.default().edit('', this.toFormData());
  }
}
