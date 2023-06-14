import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BREADService,
  dataTableColumnsFromDefault,
  defaultActionsWithHandlers,
  DeleteDialogComponent as DeleteDialog
} from 'ngx-core';
import { PageCommonService } from 'src/app/template/page/page-common.service';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'department-list',
  templateUrl: './list.component.html',
})
export class ListComponent extends PageComponent<any> {

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
      selection: true,
      pagination: true,
      actions: {
        enabled: true,
        add: {
          enabled: this.canEdit,
          routerLink: ['/administration/departments/create']
        },
        delete: {
          enabled: this.canEdit,
          subject: 'les départements sélectionnés'
        },
        import: { enabled: true },
        export: { enabled: true },
        actions: this.canEdit ? defaultActionsWithHandlers(
          (item) => {
            this.navigate([`/administration/departments/${item.id}`])
          },
          (item) => {
            this.navigate([`/administration/departments/${item.id}/edit`])
          },
          (item) => {
            this.dialog.open(DeleteDialog, {
              data: {
                subject: `le département No. ${item.id}`,
                handler: () => this.default().delete(item.id, () => this.refresh()),
              },
            });
          }
        ) : (item:any) => [{label: 'Détails', icon: 'eye', iconTheme: 'primary', routerLink: `/administration/departments/${item.id}`}]
      }
    };
  }
}
