import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BREADService,
  dataTableColumnsFromDefault,
  defaultActionsWithHandlers,
  DeleteDialogComponent as DeleteDialog
} from 'ngx-core';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'department-list',
  templateUrl: './list.component.html',
})
export class ListComponent extends Page<any> {

  list: any[] = [];
  canEdit = false;

  override ngOnInit() {
    this.init('administration/departments', '/administration/departments', 'department-list');
    this.service.userinfo.subscribe(info => { this.canEdit = info.roleRaw == 'ADMIN'; this.refresh() });
    super.ngOnInit();
  }

  refresh() {
    this.dataTableConfig = this.getDataTableConfig();
    this.browse().subscribe((response) => this.list = response);
  }

  dataTableConfig: any;
  getDataTableConfig() {
    return {
      title: 'Liste des Départements',
      columns: dataTableColumnsFromDefault({
        ref: "",
        label: "",
        visible: true,
        sortable: true
      }, [
        {
          ref: "id",
          label: "No."
        },
        {
          ref: "acronym",
          label: "Acronyme"
        },
        {
          ref: "name",
          label: "Nom"
        }
      ]),
      selection: false,
      pagination: true,
      actions: {
        enabled: true,
        add: {enabled: false},
        delete: {enabled: false},
        import: {enabled: false},
        export: {enabled: false},
        actions: (item:any) => [{label: 'Détails', icon: 'eye', iconTheme: 'primary', routerLink: `/administration/departments/${item.id}`}]
      }
    };
  }
}
