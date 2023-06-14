import { Component, ViewChild } from '@angular/core';

import { PageComponent } from 'src/app/template/page/page.component';
import { NgForm } from '@angular/forms';
import { PreviewDialogComponent as PreviewDialog } from './preview-dialog.component';

@Component({
  selector: 'school-year-form',
  templateUrl: './form.component.html',
})
export class FormComponent extends PageComponent<any> {

  @ViewChild('formCtrl', {static:false}) formCtrl:NgForm;
  @ViewChild('previewDialog') preview:PreviewDialog;

  entity: any = {};

  schoolYear:string = "";
  placeholder:string = "";

  departments:any[] =  [];
  private _regime:1|2|3 = 3;
  private _periods:number = 3;
  get periods() {
    return this._periods;
  }
  get regime() {
    return this._regime
  }
  set regime(value:any) {
    this._regime = value as 1|2|3;
    if (value != 1)
      this.periods = value;
  }
  set periods(value:number) {
    value -= 0;
    if (value < 1)
      value = 1;
    this._periods = value;
    this.ranges = Array(value).fill(undefined).map(() => ({data: {start: null, end: null}}));
  }

  $ranges:any = [];
  ranges:any = [];

  override ngOnInit() { 
    let date = new Date();
    this.schoolYear = this.placeholder = date.getFullYear() + '-' + (date.getFullYear() + 1);
    this.init('administration/periods', 'administration/school-year', 'school-year-list');
    this.http.resource('administration/departments').browse().subscribe(result => this.departments = result.map(dept => this.bakeDepartment(dept)));
    this.resource('administration/periods');
    super.ngOnInit();
  }

  bakeDepartment(department:any) {
    return {
      ...department, 
      config: 'auto', 
      $regime: undefined, 
      $periods: undefined, 
      ranges: [],
      get regime() {
        return this.$regime;
      },
      get periods() {
        return this.$periods;
      },
      set regime(value:number) {
        this.$regime = value;
        if (value != 1)
          this.periods = value;
      },
      set periods(value:number) {
        value = (value < 1) ? 1 : value - 0;
        this.$periods = value;
        this.ranges = Array(value).fill(undefined).map(() => ({start:null, end:null}));
      },
    }
  }

  updateDepartmentRegime(index:number, regime:number) {
    this.departments[index].regime = regime;
  }

  updateDepartmentPeriods(index:number, periods:number) {
    this.departments[index].periods = periods;
  }

  submit() {

    if (this.formCtrl.invalid){
      this.requestAlert('Les champs surlignés en rouge ne sont pas valides', 400, 'school-year-form')
      return;
    }

    const data = this.departments.map(department => { return {
      id: department.id,
      name: department.name,
      periods: department.config == 'none' ? [] : department.ranges,
    } });

    console.log(data);

    if (!data.every(dep => dep.periods.every((period:any) => period?.start instanceof Date && !isNaN(period?.start?.valueOf()) && period?.end instanceof Date && !isNaN(period?.end?.valueOf())))){
      this.requestAlert('Tous les champs sont obligatoires', 400, 'school-year-form')
      return;
    }


    this.preview.open({
      year: this.schoolYear,
      departments: data,
      handler: () => {
        this.default().add(data.map(dep => dep.periods.map((period:any) => ({
          year: this.schoolYear,
          departmentId: dep.id,
          startsAt: period.start,
          endsAt: period.end
        }))).flat());
      }
    });
  }


  REGIME_OPTIONS = [{label:'Trimèstre', value:3}, {label:'Semèstre', value:2}, {label:'Personalisé', value:1}]
}
