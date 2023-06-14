import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component';
import { isBlank } from '../../utils/strings';
import { DomSanitizer } from '@angular/platform-browser';


export interface DataTableFilter {
  datatype?: "string"|"number"|"date"|"enum"|"boolean";
  classes?: string;
  init?:any;
  checkbox?: {
    labelOn:string;
    labelOff:string;
    labelIn:string;
  }
}
type LocalDataTableFilter = {
  ref: string,
  label: string,
  datatype: "string"|"number"|"date"|"enum"|"boolean", 
  ngModel: any,
  classes: string,
  checkbox?: {
    labelOn:string;
    labelOff:string;
    labelIn:string;
  }
}
export interface DataTableColumn {
  ref: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  display?: Function;
  filter?: DataTableFilter;
}
export function dataTableColumnsFromDefault(defaultColumn:DataTableColumn, columns:any[]):DataTableColumn[]{
  return columns.map(col => {
    return { ...defaultColumn, ...col };
  })
}

export interface Config {
  title?:string;
  columns?: DataTableColumn[];

  selection?:boolean;
  pagination?:boolean;
}

@Component({
  template: ''
})
export abstract class DataTable {

  constructor(){}

  protected _config = defaultConfig;
  protected _source: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumnsMenu: DropdownMenuItem[]=[];
  displayedColumns: string[] = [];
  filters:LocalDataTableFilter[] = [];
  filtersOpen:boolean = false;
    
  set source(value:any[]) {
    this._source = value;
    this.selection.clear();
    this.dataSource.data = this._source;
  }
  get source():any[] {
    return this._source;
  }

  set config(value:Config) {
    
    this._config.title = this.nullSafe<string>(this._config.title, value.title, defaultConfig.title);
    this._config.columns = this.nullSafe<DataTableColumn[]>(this._config.columns, value.columns, defaultConfig.columns);

    this._config.selection = this.nullSafe<boolean>(this._config.selection, value.selection, defaultConfig.selection);
    this._config.pagination = this.nullSafe<boolean>(this._config.pagination, value.pagination, defaultConfig.pagination);


    /* -- update actions in rows -- */
    this.source = this.source;
  
    /* -- define visible columns -- */
    const $this = this;
    this.displayedColumnsMenu = this._config.columns.map(coldef => { return { label:coldef.label, checkbox: { checked: coldef.visible, onChange(checked) {
      $this._config.columns = $this._config.columns.map(cd => { if(cd.ref === coldef.ref) cd.visible = checked; return cd;});
      $this.updateDisplayedColumns();
    }, } } });
    $this.updateDisplayedColumns();

    /* -- define filters -- */
    this.filters = this._config.columns
      .filter(codef => codef.filter != undefined)
      .map(codef => {return {ref: codef.ref, label: codef.label, datatype: codef.filter?.datatype || "string", ngModel: codef.filter?.init, checkbox: codef.filter?.checkbox, classes: codef.filter?.classes || "col-lg-3 col-md-4 col-sm-6 col-12"}});
    this.applyFilters();
  }
  get config():typeof this._config {
    
    return this._config;
  }
  protected nullSafe<T>(fallback:T, ...args:(T|undefined)[]):T {
    let res = args.find(arg => arg!=undefined);
    return res === undefined ? fallback : res;
  }
  protected updateDisplayedColumns() {
    this.displayedColumns = this._config.columns.filter(coldef => coldef.visible).map(coldef => coldef.ref);
    if (this._config.selection) this.displayedColumns.unshift('select');
  }

  selection:SelectionModel<any> = new SelectionModel<any>(true, []);
  
  
  abstract ngOnInit():void;

  abstract ngAfterViewInit():void;

  /** Filters the table data 
   * filters are retrieved from input fields, their values are grouped as an object which is serialized as a string
   * @param jsonFilter - the filter object serialized as a string
   * @param data the item from table data to test
   * @returns boolean - Whether the filter applies
   */
  filterPredicate(data: any, jsonFilter: string):boolean {
    if (this.filters.length == 0)
      return true;
    let filterModel = JSON.parse(jsonFilter);
    return this.filters.map((filter):boolean => {
      if (!(filter.ref in filterModel))
        return true;
      switch(filter.datatype){
        case "string":
          return data[filter.ref]?.toLowerCase().includes(filterModel[filter.ref].toLowerCase());
        case "boolean":
          return data[filter.ref] == filterModel[filter.ref];
        case "number":
          if (filterModel[filter.ref].min === null || filterModel[filter.ref].min === undefined)
            filterModel[filter.ref].min = -Infinity; 
          if (filterModel[filter.ref].max === null || filterModel[filter.ref].max === undefined)
            filterModel[filter.ref].max = Infinity; 
          return data[filter.ref] >= filterModel[filter.ref].min && data[filter.ref] <= filterModel[filter.ref].max;
        case "date":
          let dataTime = new Date(data[filter.ref]).getTime();
          if (filterModel[filter.ref].min === null || filterModel[filter.ref].min === undefined)
            filterModel[filter.ref].min = -Infinity; 
          if (filterModel[filter.ref].max === null || filterModel[filter.ref].max === undefined)
            filterModel[filter.ref].max = Infinity; 
          return dataTime >= filterModel[filter.ref].min && dataTime <= filterModel[filter.ref].max;
        case "enum":
          return filterModel[filter.ref]?.includes(data[filter.ref]);
        default:
          return true;
      }
    }).reduce((prev, current) => prev && current)
  } 

  applyFilters() {
    let jsonFilter:any = {};
    this.filters.forEach(filter => {
      let value:any = filter.ngModel;
      if (value === undefined)
        return
      if (typeof value === "string" && isBlank(value))
        return;
      switch(filter.datatype){
        case "number":
          value = {
            min: value.min ? value.min : null,
            max: value.max ? value.max : null
          };
          break;
        case "date":
          value = {
            min: value.start ? new Date(value.start).getTime() : null,
            max: value.end ? new Date(value.end).getTime() : null
          };
          break;
      }
      jsonFilter[filter.ref] = value;
    })
    this.selection.clear();
    this.dataSource.filter = JSON.stringify(jsonFilter);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected == numRows;
  }

  /** Selects a rows if it's not selected; otherwise unselect it. */
  toggleRow(row:any) {
    this.selection.toggle(row);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }
}

const defaultConfig = {
  title: '',
  columns: new Array<DataTableColumn>(),

  selection: false,
  pagination: true
};
