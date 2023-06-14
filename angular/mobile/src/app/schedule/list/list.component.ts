import { Component } from '@angular/core';
import { Page } from 'src/app/page/page.component';
import { DropdownMenuItem, DataTableColumn, DataTableConfig } from 'ngx-core';
import { Context } from 'ngx-core';

@Component({
  selector: 'app-schedule-list',
  template: '<p>Can not use this directly</p>',
})
export abstract class ListComponent extends Page<any> {

  list: any[] = [];
  dataTableConfig: DataTableConfig;
  context:Context;

  abstract get label():string;
  abstract get columns():DataTableColumn[];
  abstract get scheduleRoute():string;
  abstract refresh():void;

  protected override onCreate(): void {
    this.dataTableConfig = {
      title: this.label,
      columns: this.columns,
      selection: false,
      pagination: true,
      actions: {
        enabled: true,
        add: { enabled: false },
        delete: { enabled: false },
        import: { enabled: false },
        export: { enabled: false },
        actions: (item: any) => [
          {
            label: "Consulter l'Emploi de Temps",
            icon: "eye",
            iconTheme: "primary",
            routerLink: [`${this.scheduleRoute}/${item.id}`]
          }
        ],
      }
    }
  }

  override ngOnInit():void {
    this.service.setUsesContext(true);
    this.service.context.subscribe((context) => {
      this.context = context;
      this.refresh();
    });
    super.ngOnInit();
  }

}
