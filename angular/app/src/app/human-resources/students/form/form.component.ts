import { Component } from '@angular/core';
import { SelectOption, DataTableDialogComponent, dataTableColumnsFromDefault } from 'ngx-core';
import { MainParent, Student } from '../student.entity';
import { FormComponent as PersonForm } from '../../generic/form.component';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { Civility, Gender } from '../../person.entity';

@Component({
  selector: 'student-form',
  templateUrl: './form.component.html',
})
export class FormComponent extends PersonForm<Student> {

  MainParent = MainParent;
  parents:any[];

  faRotate = faRotate

  override onCreate() {
    this.entity = new Student;
    this.initialize("students", "student-form", "student-list")
  }

  copy(destination:Student, original: Student) {
    Student.copy(original, destination);
  }

  showParentsDialog(parent:MainParent) {
    this.http.resource("human-resources/parents").browse().subscribe(response => {
      this.dialog.open(DataTableDialogComponent, {
        data: {
          data:response,
          title:"Séléctionner le Parent",
          columns: dataTableColumnsFromDefault({
            ref: "",
            label: "",
            visible: true,
            sortable: true,
            filter: {
              datatype: "string"
            }
          },  
          [
            {
              ref: "id",
              label: "No.",
              filter: { datatype: "number" }
            },
            {
              ref: "code",
              label: "Code",
              visible: false
            },
            {
              ref: "firstName",
              label: "Prénom",
            },
            {
              ref: "lastName",
              label: "Nom"
            },
            {
              ref: "active",
              label: "Activé",
              visible: false,
              sortable: false,
              display: function(value:boolean){ return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
              filter: { datatype: "boolean", init: true, checkbox: { labelOn: "activé", labelOff: "désactivé", labelIn: "ignoré" } }
            },
            {
              ref: "archived",
              label: "Archivé",
              visible: false,
              sortable: false,
              display: function(value:boolean){ return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
              filter: { datatype: "boolean", init: false, checkbox: { labelOn: "archivé", labelOff: "désarchivé", labelIn: "ignoré" } },
            }
          ]),
        
          multipleSelection:false,
          pagination:true,
        
          onSelect: (value:any[]) => {
            if (parent == MainParent.FATHER)
              this.entity.father = value.length == 1 ? value[0] : undefined;
            else if (parent == MainParent.MOTHER)
              this.entity.mother = value.length == 1 ? value[0] : undefined;
            else if (parent == MainParent.TUTOR)
              this.entity.tutor = value.length == 1 ? value[0] : undefined;

            console.log(value);
          }
          
        }
      });
    });
    this.resource("human-resources/students");
  }

  override getFormData():FormData{
    let formData = super.getFormData();
    
    formData.set("civility", this.entity.civility || (this.entity.gender == Gender.FEMALE ? Civility.MISS : Civility.MR));
    if (this.entity.idType) formData.set("idType", this.entity.idType); else formData.delete("idType");
    if (this.entity.idNumber) formData.set("idNumber", this.entity.idNumber); else formData.delete("idNumber");
    if (this.entity.idDateOfIssue) formData.set("idDateOfIssue", this.entity.idDateOfIssue?.substring(0, 10)); else formData.delete("idDateOfIssue");
    if (this.entity.idPlaceOfIssue) formData.set("idPlaceOfIssue", this.entity.idPlaceOfIssue); else formData.delete("idPlaceOfIssue");
    formData.set("address.street", this.entity.address.street || "null");
    formData.set("address.code", this.entity.address.code || "null");
    formData.set("address.city", this.entity.address.city || "null");
    formData.set("address.state", this.entity.address.state || "null");
    formData.set("address.country", this.entity.address.country || "null");

    formData.append("useParentAddress", this.entity.useParentAddress ? "on" : "off");
    formData.append("mainParent", this.entity.mainParent);
    if (this.entity.father) formData.append("fatherId", this.entity.father.id + '');
    if (this.entity.mother) formData.append("motherId", this.entity.mother.id + '');
    if (this.entity.tutor) formData.append("tutorId", this.entity.tutor.id + '');

    return formData;
  }

  MAIN_PARENT_OPTIONS:SelectOption[] = [
    {value: MainParent.FATHER, label: 'Père'}, 
    {value: MainParent.MOTHER, label: 'Mère'}, 
    {value: MainParent.TUTOR, label: 'Tuteur'}, 
  ];
}