import { Component } from '@angular/core';
import { Context, DropdownMenuItem, DataTableColumn, DataTableConfig } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'app-schedule-list',
  template: '<p>Can not use this directly</p>',
})
export abstract class ListComponent extends PageComponent<any> {

  abstract get title():string;
  abstract get columns():DataTableColumn[];
  abstract get scheduleRoute():string;
  abstract refresh():void;

  override ngOnInit():void {
    this.service.setUsesContext(true);
    this.service.context.subscribe(context => {
      this.context = context; 
      this.refresh();
    });
    super.ngOnInit();
    this.dataTableConfig.title = this.title;
    this.dataTableConfig.columns = this.columns;
    this.dataTableConfig.actions!.actions = (item: any) => [
      {
        label: "Consulter l'Emploi de Temps",
        icon: "eye",
        iconTheme: "primary",
        routerLink: [`${this.scheduleRoute}/${item.id}`]
      }
    ] as DropdownMenuItem[];
  }

  context:Context;
  list: any[] = [];
  dataTableConfig: DataTableConfig = {
    title: '',
    columns: [],
    selection: false,
    pagination: true,
    actions: {
      enabled: true,
      add: { enabled: false },
      delete: { enabled: false },
      import: { enabled: false },
      export: { enabled: false },
      actions: (item: any) => [],
    }
  };
}
