// import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
// 
// import { MatTableDataSource } from '@angular/material/table';
// import { SelectionModel } from '@angular/cdk/collections';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component';
// import { isBlank } from '../../utils/strings';
// 
// export interface DeleteInterface {
//   subject: string;
//   handler: Function;
// }
// export interface DataTableFilter {
//   datatype?: "string"|"number"|"date"|"enum"|"boolean";
//   classes?: string;
//   init?:any;
//   checkbox?: {
//     labelOn:string;
//     labelOff:string;
//     labelIn:string;
//   }
// }
// type LocalDataTableFilter = {
//   ref: string,
//   label: string,
//   datatype: "string"|"number"|"date"|"enum"|"boolean", 
//   ngModel: any,
//   classes: string,
//   checkbox?: {
//     labelOn:string;
//     labelOff:string;
//     labelIn:string;
//   }
// }
// export interface DataTableColumn {
//   ref: string;
//   label: string;
//   visible: boolean;
//   sortable: boolean;
//   display?: Function;
//   filter?: DataTableFilter;
// }
// export function dataTableColumnsFromDefault(defaultColumn:DataTableColumn, columns:any[]):DataTableColumn[]{
//   return columns.map(col => {
//     return { ...defaultColumn, ...col };
//   })
// }
// 
// export class ActionMenuItem {
//   divider?:boolean;
//   icon?:string;
//   label?:string;
//   theme?:string;
//   iconTheme?:string;
//   onClick?:(item:any) => void;
// }
// 
// export interface DataTableConfig {
//   title?:string;
//   columns?: DataTableColumn[];
// 
//   selection?:boolean;
//   pagination?:boolean;
// 
//   actions?: {
//     enabled?:boolean,
//     actions?:(item:any) => DropdownMenuItem[],
//     selectionActions?:(items:any[]) => DropdownMenuItem[],
//     add?: {
//       enabled?:boolean,
//       routerLink?:any[]|undefined,
//       onClick?: () => void,
//       icon?: string,
//       iconType?: string,
//       label?: string
//     },
//     delete?: {
//       enabled?:boolean,
//       routerLink?:any[]|undefined,
//       onClick?: (items: any[]) => void,
//       icon?: string,
//       iconType?: string,
//       label?: string,
//     },
//     import?: {
//       enabled?:boolean,
//       icon?: string,
//       iconType?: string,
//       label?: string,
//       options?: DropdownMenuItem[]
//     },
//     export?: {
//       enabled?:boolean,
//       icon?: string,
//       iconType?: string,
//       label?: string,
//       options?: DropdownMenuItem[]
//     },
//   };
// 
// }
// 
// @Component({
//   selector: 'data-table',
//   templateUrl: './data-table.component.html',
//   styleUrls: ['./data-table.component.css']
// })
// export class DataTableComponent implements OnInit, AfterViewInit {
// 
//   private _config = defaultConfig;
//   private _source: any[] = [];
//   dataSource = new MatTableDataSource<any>();
//   displayedColumnsMenu: DropdownMenuItem[]=[];
//   displayedColumns: string[] = [];
//   filters:LocalDataTableFilter[] = [];
//   filtersOpen:boolean = false;
//     
//   @Input() set source(value:any[]) {
//     this._source = value.map((item) => { return {...item, DATA_TABLE_ACTION_MENU: this._config.actions.actions(item)} });
//     this.selection.clear();
//     this.dataSource.data = this._source;
//   }
//   get source():any[] {
//     return this._source;
//   }
// 
//   @Input() set config(value:DataTableConfig) {
//     this._config.title = this.nullSafe<string>(this._config.title, value.title, defaultConfig.title);
//     this._config.columns = this.nullSafe<DataTableColumn[]>(this._config.columns, value.columns, defaultConfig.columns);
// 
// 
//     this._config.selection = this.nullSafe<boolean>(this._config.selection, value.selection, defaultConfig.selection);
//     this._config.pagination = this.nullSafe<boolean>(this._config.pagination, value.pagination, defaultConfig.pagination)
// 
// 
//     this._config.actions.actions = this.nullSafe<(item:any) => DropdownMenuItem[]>(this._config.actions.actions, value.actions?.actions, defaultConfig.actions.actions);
//     this._config.actions.selectionActions = this.nullSafe<(items:any[]) => DropdownMenuItem[]>(this._config.actions.selectionActions, value.actions?.selectionActions, defaultConfig.actions.selectionActions);
//     this._config.actions.enabled = this.nullSafe<boolean>(this._config.actions.enabled, value.actions?.enabled, defaultConfig.actions.enabled) && this._config.actions.actions.length > 0;
// 
//     this._config.actions.add.enabled = this.nullSafe<boolean>(this._config.actions.add.enabled, value.actions?.add?.enabled, defaultConfig.actions.add.enabled);
//     this._config.actions.add.label = this.nullSafe<string>(this._config.actions.add.label, value.actions?.add?.label, defaultConfig.actions.add.label);
//     this._config.actions.add.icon = this.nullSafe<string>(this._config.actions.add.icon, value.actions?.add?.icon, defaultConfig.actions.add.icon);
//     this._config.actions.add.routerLink = this.nullSafe<any[] | undefined>(this._config.actions.add.routerLink, value.actions?.add?.routerLink, defaultConfig.actions.add.routerLink);
//     this._config.actions.add.onClick = this.nullSafe<() => void>(this._config.actions.add.onClick, value.actions?.add?.onClick, defaultConfig.actions.add.onClick);
// 
//     this._config.actions.delete.enabled = this.nullSafe<boolean>(this._config.actions.delete.enabled, value.actions?.delete?.enabled, defaultConfig.actions.delete.enabled);
//     this._config.actions.delete.label = this.nullSafe<string>(this._config.actions.delete.label, value.actions?.delete?.label, defaultConfig.actions.delete.label);
//     this._config.actions.delete.icon = this.nullSafe<string>(this._config.actions.delete.icon, value.actions?.delete?.icon, defaultConfig.actions.delete.icon);
//     this._config.actions.delete.routerLink = this.nullSafe<any[] | undefined>(this._config.actions.delete.routerLink, value.actions?.delete?.routerLink, defaultConfig.actions.delete.routerLink);
//     this._config.actions.delete.onClick = this.nullSafe<(items: any[]) => void>(this._config.actions.delete.onClick, value.actions?.delete?.onClick, defaultConfig.actions.delete.onClick);
// 
//     this._config.actions.import.enabled = this.nullSafe<boolean>(this._config.actions.import.enabled, value.actions?.import?.enabled, defaultConfig.actions.import.enabled);
//     this._config.actions.import.label = this.nullSafe<string>(this._config.actions.import.label, value.actions?.import?.label, defaultConfig.actions.import.label);
//     this._config.actions.import.icon = this.nullSafe<string>(this._config.actions.import.icon, value.actions?.import?.icon, defaultConfig.actions.import.icon);
//     this._config.actions.import.options = this.nullSafe<DropdownMenuItem[]>(this._config.actions.import.options, value.actions?.import?.options, defaultConfig.actions.import.options);
//    
//     this._config.actions.export.enabled = this.nullSafe<boolean>(this._config.actions.export.enabled, value.actions?.export?.enabled, defaultConfig.actions.export.enabled);
//     this._config.actions.export.label = this.nullSafe<string>(this._config.actions.export.label, value.actions?.export?.label, defaultConfig.actions.export.label);
//     this._config.actions.export.icon = this.nullSafe<string>(this._config.actions.export.icon, value.actions?.export?.icon, defaultConfig.actions.export.icon);
//     this._config.actions.export.options = this.nullSafe<DropdownMenuItem[]>(this._config.actions.export.options, value.actions?.export?.options, defaultConfig.actions.export.options);
//     
//     /* -- update actions in rows -- */
//     this.source = this.source;
//   
//     /* -- define visible columns -- */
//     const $this = this;
//     this.displayedColumnsMenu = this._config.columns.map(coldef => { return { label:coldef.label, checkbox: { checked: coldef.visible, onChange(checked) {
//       $this._config.columns = $this._config.columns.map(cd => { if(cd.ref === coldef.ref) cd.visible = checked; return cd;});
//       $this.updateDisplayedColumns();
//     }, } } });
//     $this.updateDisplayedColumns();
// 
//     /* -- define filters -- */
//     this.filters = this._config.columns
//       .filter(codef => codef.filter != undefined)
//       .map(codef => {return {ref: codef.ref, label: codef.label, datatype: codef.filter?.datatype || "string", ngModel: codef.filter?.init, checkbox: codef.filter?.checkbox, classes: codef.filter?.classes || "col-lg-3 col-md-4 col-sm-6 col-12"}});
//     this.applyFilters();
//   }
//   get config():typeof this._config {
//     return this._config;
//   }
//   private nullSafe<T>(fallback:T, ...args:(T|undefined)[]):T {
//     let res = args.find(arg => arg!=undefined);
//     return res === undefined ? fallback : res;
//   }
//   private updateDisplayedColumns() {
//     this.displayedColumns = this._config.columns.filter(coldef => coldef.visible).map(coldef => coldef.ref);
//     if (this._config.selection) this.displayedColumns.unshift('select');
//     if (this._config.actions.enabled) this.displayedColumns.push('action');
//   }
// 
//   @ViewChild(MatPaginator) paginator?: MatPaginator;
//   @ViewChild(MatSort) sort?: MatSort;
// 
//   selection:SelectionModel<any> = new SelectionModel<any>(true, []);
//   selectionActions:DropdownMenuItem[] = [];
//   
//   ngOnInit() {
//     this.dataSource.filterPredicate = (data: any, filter: string) => this.filterPredicate(data, filter);
//   }
// 
//   ngAfterViewInit() {
//     if (this.paginator) this.dataSource.paginator = this.paginator;
//     if (this.sort) this.dataSource.sort = this.sort;
//   }
// 
//   /** Filters the table data 
//    * filters are retrieved from input fields, their values are grouped as an object which is serialized as a string
//    * @param jsonFilter - the filter object serialized as a string
//    * @param data the item from table data to test
//    * @returns boolean - Whether the filter applies
//    */
//   filterPredicate(data: any, jsonFilter: string):boolean {
//     if (this.filters.length == 0)
//       return true;
//     let filterModel = JSON.parse(jsonFilter);
//     return this.filters.map((filter):boolean => {
//       if (!(filter.ref in filterModel))
//         return true;
//       switch(filter.datatype){
//         case "string":
//           return data[filter.ref]?.toLowerCase().includes(filterModel[filter.ref].toLowerCase());
//         case "boolean":
//           return data[filter.ref] == filterModel[filter.ref];
//         case "number":
//           if (filterModel[filter.ref].min === null || filterModel[filter.ref].min === undefined)
//             filterModel[filter.ref].min = -Infinity; 
//           if (filterModel[filter.ref].max === null || filterModel[filter.ref].max === undefined)
//             filterModel[filter.ref].max = Infinity; 
//           return data[filter.ref] >= filterModel[filter.ref].min && data[filter.ref] <= filterModel[filter.ref].max;
//         case "date":
//           let dataTime = new Date(data[filter.ref]).getTime();
//           if (filterModel[filter.ref].min === null || filterModel[filter.ref].min === undefined)
//             filterModel[filter.ref].min = -Infinity; 
//           if (filterModel[filter.ref].max === null || filterModel[filter.ref].max === undefined)
//             filterModel[filter.ref].max = Infinity; 
//           return dataTime >= filterModel[filter.ref].min && dataTime <= filterModel[filter.ref].max;
//         case "enum":
//           return filterModel[filter.ref]?.includes(data[filter.ref]);
//         default:
//           return true;
//       }
//     }).reduce((prev, current) => prev && current)
//   } 
// 
//   applyFilters() {
//     let jsonFilter:any = {};
//     this.filters.forEach(filter => {
//       let value:any = filter.ngModel;
//       if (value === undefined)
//         return
//       if (typeof value === "string" && isBlank(value))
//         return;
//       switch(filter.datatype){
//         case "number":
//           value = {
//             min: value.min ? value.min : null,
//             max: value.max ? value.max : null
//           };
//           break;
//         case "date":
//           value = {
//             min: value.start ? new Date(value.start).getTime() : null,
//             max: value.end ? new Date(value.end).getTime() : null
//           };
//           break;
//       }
//       jsonFilter[filter.ref] = value;
//     })
//     this.selection.clear();
//     this.dataSource.filter = JSON.stringify(jsonFilter);
//   }
// 
//   /** Whether the number of selected elements matches the total number of rows. */
//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.filteredData.length;
//     return numSelected == numRows;
//   }
// 
//   /** Selects a rows if it's not selected; otherwise unselect it. */
//   toggleRow(row:any) {
//     this.selection.toggle(row);
//     this.selectionActions = this._config.actions.selectionActions(this.selection.selected);
//   }
// 
//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   toggleAllRows() {
//     this.isAllSelected() ?
//         this.selection.clear() :
//         this.dataSource.filteredData.forEach(row => this.selection.select(row));
//     this.selectionActions = this._config.actions.selectionActions(this.selection.selected);
//   }
// }
// 
// export const defaultImportExportOptions:DropdownMenuItem[] = [
//   {
//     label: 'JSON',
//     icon: "file-code",
//     onClick: () => {}
//   },
//   {
//     label: 'Excel',
//     icon: "file-excel",
//     onClick: () => {}
//   },
//   {
//     label: 'CSV',
//     icon: "file-csv",
//     onClick: () => {}
//   }
// ];
// 
// export const defaultConfig = {
//   title: '',
//   columns: new Array<DataTableColumn>(),
// 
//   selection: false,
//   pagination: true,
// 
//   actions: {
//     enabled:true,
//     actions: (item:any) => [] as DropdownMenuItem[],
//     selectionActions: (items:any[]) => [] as DropdownMenuItem[],
//     add: {
//       enabled:true,
//       routerLink: undefined as (any[]|undefined),
//       onClick: () => {},
//       icon: "add",
//       iconType: "solid" as "solid" | "regular" | "brand",
//       label: 'Ajouter'
//     },
//     delete: {
//       enabled:true,
//       routerLink: undefined as (any[]|undefined),
//       onClick: (items:any[]) => {},
//       icon: "trash",
//       iconType: "solid" as "solid" | "regular" | "brand",
//       label: 'Supprimer',
//     },
//     import: {
//       enabled:true,
//       icon: "upload",
//       iconType: "solid" as "solid" | "regular" | "brand",
//       label: 'Importer',
//       options: defaultImportExportOptions
//     },
//     export: {
//       enabled:true,
//       icon: "download",
//       iconType: "solid" as "solid" | "regular" | "brand",
//       label: 'Exporter',
//       options: defaultImportExportOptions
//     },
//   },
// };
// 
// export function defaultActionsWithHandlers(
//   onView:(item:any)=>void,
//   onEdit:(item:any)=>void,
//   onDelete:(item:any)=>void
// ) {
//     return (item:any) => [
//     {
//       label: "Voir",
//       icon: "eye",
//       iconType: "solid",
//       theme: "primary",
//       onClick: () => onView(item)
//     },
//     {
//       label: "Modifier",
//       icon: "pen-to-square",
//       iconType: "solid",
//       theme: "warning",
//       onClick: () => onEdit(item)
//     },
//     {
//       label: "Supprimer",
//       icon: "trash",
//       iconType: "solid",
//       theme: "danger",
//       onClick: () => onDelete(item)
//     }
//   ];
// }
// 