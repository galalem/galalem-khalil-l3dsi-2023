// import { Component, Inject } from '@angular/core';
// 
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component';
// import { DataTableComponent, DataTableColumn } from './data-table.component';
// 
// export interface DataTableDialogConfig {
// 
//   data:any[];
// 
//   title?:string;
//   columns?: DataTableColumn[];
// 
//   preSelected?: (item:any) => boolean;
//   multipleSelection?:boolean;
//   pagination?:boolean;
// 
//   onSelect: (value:any[]) => void;
// }
// 
// @Component({
//   selector: 'data-table-dialog',
//   templateUrl: './data-table-dialog.component.html',
//   styleUrls: ['./data-table.component.css']
// })
// export class DataTableDialogComponent extends DataTableComponent {
// 
//   selectMultiple:boolean = false;
//   onSelect = (value:any[]) => { };
// 
//   private set configuration(value:DataTableDialogConfig){
//     this.onSelect = value.onSelect;
//     this.source = value.data;
//     this.selectMultiple = value.multipleSelection === true;
//     this.config = {
//       title: value.title,
//       columns: value.columns,
//     
//       selection: true,
//       pagination: value.pagination,
//     
//       actions: {
//         enabled:false,
//         actions: (item:any) => [] as DropdownMenuItem[],
//         selectionActions: (items:any[]) => [] as DropdownMenuItem[],
//         add: {
//           enabled:false
//         },
//         delete: {
//           enabled:false
//         },
//         import: {
//           enabled:false
//         },
//         export: {
//           enabled:false
//         },
//       },
//     };
//     if (value.preSelected)
//       for(let row of this.dataSource.data)
//         if (value.preSelected(row))
//           this.toggleRow(row);
// 
//   }
//   
// 
//   constructor(public dialogRef: MatDialogRef<DataTableDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DataTableDialogConfig){
//     super();
//     this.dialogRef.afterClosed().subscribe(result => {
//       if (result)
//         this.onSelect(this.selection.selected);
//     });
//   }
// 
//   override ngOnInit() {
//     super.ngOnInit();
//     this.configuration = this.data;
//   }
// 
//   /** Selects a rows if it's not selected; otherwise unselect it. */
//   override toggleRow(row:any) {
//     if (!this.selectMultiple) this.selection.clear();
//     super.toggleRow(row);
//   }
// 
//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   override toggleAllRows() {
//     this.isAllSelected() ?
//         this.selection.clear() :
//         this.dataSource.filteredData.forEach(row => this.selection.select(row));
//   }
// }
// 