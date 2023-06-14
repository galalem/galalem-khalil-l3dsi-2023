import { Component, ViewChild } from '@angular/core';
import { Person, Civility, Gender, ID } from '../person.entity';
import { PageComponent } from 'src/app/template/page/page.component';
import { SelectOption, nationalities } from 'ngx-core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'person-form',
  template: '<p>Can not use this directly</p>',
})
export abstract class FormComponent<T extends Person> extends PageComponent<T> {


  @ViewChild('formCtrl', {static:false}) formCtrl:NgForm;
  entity: T;
  photo:any;
  editMode: boolean = false;
  private ref:string;
  private formSelector:string; 
  private listSelector:string;  

  initialize(ref:string, formSelector:string, listSelector:string) {
    this.ref = ref;
    this.formSelector = formSelector;
    this.listSelector = listSelector;
    this.init('human-resources/' + this.ref, 'human-resources/' + this.ref, this.listSelector);
  } 

  override ngOnInit() {   
    let id = this.getRouteParam('id');
    if (id) 
      this.default().read(id, (response:T) => {
        response.nationality = response.nationality.toUpperCase();
        this.log(response)
        this.copy(this.entity, response);
      });
    super.ngOnInit();
  }
  abstract copy(destination:T, original:T):void;

  getFormData():FormData {
    let formData = new FormData();
    formData.append("firstName", this.entity.firstName);
    formData.append("lastName", this.entity.lastName);
    formData.append("code", this.entity.code);
    formData.append("username", this.entity.username);
    formData.append("gender", this.entity.gender);
    formData.append("civility", this.entity.civility);
    formData.append("about", this.entity.about);
    formData.append("dateOfBirth", this.entity.dateOfBirth?.substring(0, 10));
    formData.append("placeOfBirth", this.entity.placeOfBirth);
    formData.append("nationality", this.entity.nationality);
    formData.append("idType", this.entity.idType);
    formData.append("idNumber", this.entity.idNumber);
    formData.append("idDateOfIssue", this.entity.idDateOfIssue?.substring(0, 10));
    formData.append("idPlaceOfIssue", this.entity.idPlaceOfIssue);
    formData.append("email", this.entity.email);
    formData.append("phone", this.entity.phone);
    formData.append("phone2", this.entity.phone2);
    formData.append("address.street", this.entity.address.street);
    formData.append("address.code", this.entity.address.code);
    formData.append("address.city", this.entity.address.city);
    formData.append("address.state", this.entity.address.state);
    formData.append("address.country", this.entity.address.country);
    
    if (this.photo?.length === 1) formData.append("photo", this.photo[0]);

    return formData;
  }

  submit() {

    if (this.formCtrl.invalid){
      this.requestAlert(`Les champs surlignés en rouge ne sont pas valides`, 400, this.formSelector)
      return;
    }

    let formData = this.getFormData();

    if (this.entity.id)
      this.default().edit(this.entity.id, formData);
    else
      this.default().add(formData)
  }

  GENDER_OPTIONS:SelectOption[] = [
    {value: Gender.MALE, label: 'Male'}, 
    {value: Gender.FEMALE, label: 'Femelle'}, 
  ];

  CIVILITY_OPTIONS:SelectOption[] = [
    {value: Civility.MR, label: 'Monsieur'}, 
    {value: Civility.MRS, label: 'Madame'}, 
    {value: Civility.MISS, label: 'Mademoiselle'}
  ];

  NATIONALITY_OPTIONS:SelectOption[] = [
    {
      value: "TN",
      label: "Tunisien",
    },
    {
      value: "FR",
      label: "Français",
    },
    {
      value: "-",
      label: "== Autres ====",
      disabled: true,
    },
    ...nationalities.map(nationality => {
      return {
        value: nationality.key,
        label: nationality.value
      }
    })
  ];

  IDTYPE_OPTIONS:SelectOption[] = [
    {value: ID.NIC, label: 'Carte d\'Identité Nationale'}, 
    {value: ID.PASSPORT, label: 'Passport'}, 
    {value: ID.RP, label: 'Carte de Séjour'}
  ];
}
