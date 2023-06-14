import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BREADService, DropdownMenuItem } from 'ngx-core';

export type Context = {
  year: string,
  department: number,
  period: number,
}

@Component({
  selector: 'context-menu, [contextMenu]',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent {

  departments:any[] = [];
  periods:any[] = [];

  departmentsDropdownItems:DropdownMenuItem[];
  periodsDropdownItems:DropdownMenuItem[];
  yearsDropdownItems:DropdownMenuItem[];

  contextButtonGroup = {
    year: "",
    department: "",
    period: ""
  } 

  private _context:Context = {
    year: "",
    department: 0,
    period: 0,
  } 

  @Input()
  set context(value:Context){
    this.onSelectYear(value.year || "", true);
    this.onSelectDepartment(value.department || 0, true);
    this.onSelectPeriod(value.period || 0);
  }

  @Input()
  disabled:boolean=false;

  @Output()
  contextChange: EventEmitter<Context> = new EventEmitter<Context>();


  constructor(private http:BREADService<any>){
    this.refresh();
  }
  
  refresh() {
    this.http.raw().get<any[]>(this.http.base + '/api/administration/departments').subscribe((result:any[]) => {
      this.departments = result;
      this.http.raw().get<any[]>(this.http.base + '/api/administration/periods').subscribe((result:any[]) => {

        let regimes:any = {};
        this.periods = result.sort((a, b) => {
          if (a.year != b.year)
            return a.year < b.year ? 1 : -1;
          if (a.departmentId != b.departmentId)
            return a.departmentId - b.departmentId;
          return a.startsAt > b.startsAt ? 1 : -1;
        }).filter(period => {
          let key = period.year + '#' + period.departmentId
          if (regimes[key])
            regimes[key].total++
          else 
            regimes[key] = {total: 1, index: 0};
          return true;
        }).map(period => { 
          let key = period.year + '#' + period.departmentId;
          regimes[key].index++
          let name = "Période";
          let acronym = "P";
          if (regimes[key].total == 3){
            name = "Trimestre";
            acronym = "T";
          }
          if (regimes[key].total == 2){
            name = "Semestre";
            acronym = "S";
          }
          return {...period, name: name + ' N°' + regimes[key].index, acronym: acronym + regimes[key].index} 
        });

        this.yearsDropdownItems = this.periods.map(period => period.year).filter((value, index, array) => array.indexOf(value) === index).map(year => { return {label: year, onClick: () => this.onSelectYear(year)}});
        this.context = { 
          period: this._context.period || this.periods[0]?.id || 0,
          department: this._context.department || this.periods[0]?.departmentId || 0,
          year: this._context.year || this.periods[0]?.year || ""
        }; //force refresh
      }) 
    });
  }


  onSelectPeriod(id:number) {
    if (id == this._context.period) 
      return

    this._context.period = id;
    this.contextButtonGroup.period = this.periods.find(period => period.id === id)?.acronym
    this.contextChange.emit(this._context);
  }
  onSelectDepartment(id:number, force:boolean = false) {
    if (id == this._context.department && !force)
      return
    this._context.department = id;
    this.contextButtonGroup.department = this.departments.find(department => department.id === id)?.acronym
    this.extractPeriods(id);
  }
  onSelectYear(year:string, force:boolean = false) {
    if (year == this._context.year && !force)
      return
    this._context.year = year;
    this.contextButtonGroup.year = year;
    this.extractDepartments(year);
  }

  extractPeriods(departmentId:number) {
    let periods = this.periods.filter(period => period.year == this._context.year && period.departmentId == departmentId);
    this.periodsDropdownItems = periods.map((period, index) => { return {label: period.name, onClick: () => this.onSelectPeriod(period.id)}});
    if (!periods.some(p => p.id === this._context.period))
      this.onSelectPeriod(periods[0]?.id || 0);
  }
  extractDepartments(year:string) {
    let periods = this.periods.filter(period => period.year == year);
    this.departmentsDropdownItems = periods.map(period => period.departmentId).filter((value, index, array) => array.indexOf(value) === index).map(departmentId => { return {label: this.departments.find(dept => dept.id === departmentId)?.name, onClick: () => this.onSelectDepartment(departmentId)}});
    if (!periods.some(p => p.departmentId === this._context.department))
      this.onSelectDepartment(periods[0]?.departmentId || 0, true);
    else if (!periods.some(p => p.id === this._context.period))
      this.onSelectPeriod(periods.find(p => p.departmentId === this._context.department).id);
    else
      this.contextButtonGroup.period = this.periods.find(p => p.id === this._context.period)?.acronym
  }
}
