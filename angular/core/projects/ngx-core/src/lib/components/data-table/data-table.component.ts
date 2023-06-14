import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component';
import { DataTable, DataTableColumn, Config } from './data-table.core';

export interface DeleteInterface {
  subject: string;
  handler: Function;
}

export class ActionMenuItem {
  divider?:boolean;
  icon?:string;
  label?:string;
  theme?:string;
  iconTheme?:string;
  onClick?:(item:any) => void;
}

export interface DataTableConfig extends Config {
  actions?: {
    enabled?:boolean,
    actions?:(item:any) => DropdownMenuItem[],
    selectionActions?:(items:any[]) => DropdownMenuItem[],
    add?: {
      enabled?:boolean,
      routerLink?:any[]|undefined,
      onClick?: () => void,
      icon?: string,
      iconType?: string,
      label?: string
    },
    delete?: {
      enabled?:boolean,
      routerLink?:any[]|undefined,
      onClick?: (items: any[]) => void,
      icon?: string,
      iconType?: string,
      label?: string,
    },
    import?: {
      enabled?:boolean,
      icon?: string,
      iconType?: string,
      label?: string,
      options?: DropdownMenuItem[]
    },
    export?: {
      enabled?:boolean,
      icon?: string,
      iconType?: string,
      label?: string,
      options?: DropdownMenuItem[]
    },
  };
}

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent extends DataTable implements OnInit, AfterViewInit {

  
  protected override _config = defaultConfig;
    
  @Input() override set source(value:any[]) {
    super.source = value.map((item) => { return {...item, DATA_TABLE_ACTION_MENU: this._config.actions.actions(item)} });
  }
  override get source() {
    return super.source;
  }

  @Input() override set config(value:DataTableConfig) {

    this._config.actions.actions = this.nullSafe<(item:any) => DropdownMenuItem[]>(this._config.actions.actions, value.actions?.actions, defaultConfig.actions.actions);
    this._config.actions.selectionActions = this.nullSafe<(items:any[]) => DropdownMenuItem[]>(this._config.actions.selectionActions, value.actions?.selectionActions, defaultConfig.actions.selectionActions);
    this._config.actions.enabled = this.nullSafe<boolean>(this._config.actions.enabled, value.actions?.enabled, defaultConfig.actions.enabled) && this._config.actions.actions.length > 0;

    this._config.actions.add.enabled = this.nullSafe<boolean>(this._config.actions.add.enabled, value.actions?.add?.enabled, defaultConfig.actions.add.enabled);
    this._config.actions.add.label = this.nullSafe<string>(this._config.actions.add.label, value.actions?.add?.label, defaultConfig.actions.add.label);
    this._config.actions.add.icon = this.nullSafe<string>(this._config.actions.add.icon, value.actions?.add?.icon, defaultConfig.actions.add.icon);
    this._config.actions.add.routerLink = this.nullSafe<any[] | undefined>(this._config.actions.add.routerLink, value.actions?.add?.routerLink, defaultConfig.actions.add.routerLink);
    this._config.actions.add.onClick = this.nullSafe<() => void>(this._config.actions.add.onClick, value.actions?.add?.onClick, defaultConfig.actions.add.onClick);

    this._config.actions.delete.enabled = this.nullSafe<boolean>(this._config.actions.delete.enabled, value.actions?.delete?.enabled, defaultConfig.actions.delete.enabled);
    this._config.actions.delete.label = this.nullSafe<string>(this._config.actions.delete.label, value.actions?.delete?.label, defaultConfig.actions.delete.label);
    this._config.actions.delete.icon = this.nullSafe<string>(this._config.actions.delete.icon, value.actions?.delete?.icon, defaultConfig.actions.delete.icon);
    this._config.actions.delete.routerLink = this.nullSafe<any[] | undefined>(this._config.actions.delete.routerLink, value.actions?.delete?.routerLink, defaultConfig.actions.delete.routerLink);
    this._config.actions.delete.onClick = this.nullSafe<(items: any[]) => void>(this._config.actions.delete.onClick, value.actions?.delete?.onClick, defaultConfig.actions.delete.onClick);

    this._config.actions.import.enabled = this.nullSafe<boolean>(this._config.actions.import.enabled, value.actions?.import?.enabled, defaultConfig.actions.import.enabled);
    this._config.actions.import.label = this.nullSafe<string>(this._config.actions.import.label, value.actions?.import?.label, defaultConfig.actions.import.label);
    this._config.actions.import.icon = this.nullSafe<string>(this._config.actions.import.icon, value.actions?.import?.icon, defaultConfig.actions.import.icon);
    this._config.actions.import.options = this.nullSafe<DropdownMenuItem[]>(this._config.actions.import.options, value.actions?.import?.options, defaultConfig.actions.import.options);
   
    this._config.actions.export.enabled = this.nullSafe<boolean>(this._config.actions.export.enabled, value.actions?.export?.enabled, defaultConfig.actions.export.enabled);
    this._config.actions.export.label = this.nullSafe<string>(this._config.actions.export.label, value.actions?.export?.label, defaultConfig.actions.export.label);
    this._config.actions.export.icon = this.nullSafe<string>(this._config.actions.export.icon, value.actions?.export?.icon, defaultConfig.actions.export.icon);
    this._config.actions.export.options = this.nullSafe<DropdownMenuItem[]>(this._config.actions.export.options, value.actions?.export?.options, defaultConfig.actions.export.options);
    
    super.config = value;
  }
  override get config():typeof this._config {
    return this._config;
  }

  protected override updateDisplayedColumns() {
    super.updateDisplayedColumns();
    if (this._config.actions.enabled) this.displayedColumns.push('action');
  }

  selectionActions:DropdownMenuItem[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => this.filterPredicate(data, filter);
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  /** Selects a rows if it's not selected; otherwise unselect it. */
  override toggleRow(row:any) {
    super.toggleRow(row);
    this.selectionActions = this._config.actions.selectionActions(this.selection.selected);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  override toggleAllRows() {
    super.toggleAllRows();
    this.selectionActions = this._config.actions.selectionActions(this.selection.selected);
  }
}

export const defaultImportExportOptions:DropdownMenuItem[] = [
  {
    label: 'JSON',
    icon: "file-code",
    onClick: () => {}
  },
  {
    label: 'Excel',
    icon: "file-excel",
    onClick: () => {}
  },
  {
    label: 'CSV',
    icon: "file-csv",
    onClick: () => {}
  }
];

export const defaultConfig = {
  title: '',
  columns: new Array<DataTableColumn>(),

  selection: false,
  pagination: true,

  actions: {
    enabled:true,
    actions: (item:any) => [] as DropdownMenuItem[],
    selectionActions: (items:any[]) => [] as DropdownMenuItem[],
    add: {
      enabled:true,
      routerLink: undefined as (any[]|undefined),
      onClick: () => {},
      icon: "add",
      iconType: "solid" as "solid" | "regular" | "brand",
      label: 'Ajouter'
    },
    delete: {
      enabled:true,
      routerLink: undefined as (any[]|undefined),
      onClick: (items:any[]) => {},
      icon: "trash",
      iconType: "solid" as "solid" | "regular" | "brand",
      label: 'Supprimer',
    },
    import: {
      enabled:true,
      icon: "upload",
      iconType: "solid" as "solid" | "regular" | "brand",
      label: 'Importer',
      options: defaultImportExportOptions
    },
    export: {
      enabled:true,
      icon: "download",
      iconType: "solid" as "solid" | "regular" | "brand",
      label: 'Exporter',
      options: defaultImportExportOptions
    },
  },
};

export function defaultActionsWithHandlers(
  onView:(item:any)=>void,
  onEdit:(item:any)=>void,
  onDelete:(item:any)=>void
) {
    return (item:any) => [
    {
      label: "Voir",
      icon: "eye",
      iconType: "solid",
      theme: "primary",
      onClick: () => onView(item)
    },
    {
      label: "Modifier",
      icon: "pen-to-square",
      iconType: "solid",
      theme: "warning",
      onClick: () => onEdit(item)
    },
    {
      label: "Supprimer",
      icon: "trash",
      iconType: "solid",
      theme: "danger",
      onClick: () => onDelete(item)
    }
  ] as DropdownMenuItem[];
}
