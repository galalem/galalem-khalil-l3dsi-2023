import { AfterViewInit, Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataTable, Config, DataTableColumn } from './data-table.core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';

export interface DataTableDialogConfig extends Config {
  data:any[];
  multipleSelection?:boolean;
  preSelected?: (item:any) => boolean;
  onSelect: (value:any[]) => void;
}

@Component({
  selector: 'data-table-dialog',
  templateUrl: './data-table-dialog.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableDialogComponent extends DataTable implements OnInit, AfterViewInit {

  selectMultiple:boolean = false;
  onSelect = (value:any[]) => { };

  protected override _config = defaultConfig;

  override set config(value:DataTableDialogConfig){
    value.selection = true;
    this.onSelect = value.onSelect;
    this.source = value.data;
    this.selectMultiple = value.multipleSelection === true;

    super.config = value;

    if (value.preSelected)
      for(let row of this.dataSource.data)
        if (value.preSelected(row))
          this.toggleRow(row);
  }
  override get config():typeof this._config {
    return this._config;
  }
  

  constructor(public dialogRef: MatDialogRef<DataTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataTableDialogConfig){
    super();
    this.dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.onSelect(this.selection.selected);
    });
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => this.filterPredicate(data, filter);
    this.config = this.data;
  }

  /** Selects a rows if it's not selected; otherwise unselect it. */
  override toggleRow(row:any) {
    if (!this.selectMultiple) this.selection.clear();
    super.toggleRow(row);
  }
}

const defaultConfig = {
  
  data:new Array<any>(),

  title: '',
  columns: new Array<DataTableColumn>(),

  selection: true,
  pagination: true,
  selectMultiple:false,
  onSelect: (value:any[]) => { },
  
  preSelected: (item:any) => false
};

