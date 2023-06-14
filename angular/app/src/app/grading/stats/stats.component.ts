import { Component } from '@angular/core';
import { DataTableConfig } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'grading-stats',
  template: `<p>it works</p>`,
})
export class StatsComponent extends PageComponent<any> {

  list:any[] = [];
  percent = 0;
  grades = 0;
  total = 0;

  protected get ref():string {
    return '';
  }

  public override ngOnInit() {
    this.service.setUsesContext(null);
    this.init('schooling/evaluations', 'grading/sessions', 'grading-sessions-list');
    this.resource('schooling/evaluations/'+this.getRouteParam('id')+'/progress/' + this.ref);
    this.browse().subscribe(response => { 
      this.list = response.map(item => ({...item, percent: item.done * 100 / item.total})); 
      console.log(response);
      let {done, total} = this.list.reduce((a,b) => ({done: a.done + b.done, total: a.total + b.total}), {done:0, total:0});
      this.grades = done;
      this.total = total;
      this.percent = parseFloat((done * 100 / total).toFixed(2));
      this.resource('human-resources/'+this.ref+'?ids='+response.map(item => item.id).join(','));
      this.browse().subscribe(people => {
        this.list = this.list.map(item => ({...people.find(person => person.id == item.id), ...item}));
      })
    })
    super.ngOnInit();
  }

  private getThemeFromPercent(percent:number):string {
    if (percent < 25) 
      return 'danger'
    if (percent < 50)
      return 'warning'
    if(percent < 75)
      return 'success'
    return 'info'
  }

  dataTableConfig:DataTableConfig = {
    title: "Avancement de remise des notes par enseignant",
    columns: [
      {
        ref: "id",
        label: "No.",
        visible: true,
        sortable: true,
      },
      {
        ref: "code",
        label: "Code",
        visible: false,
        sortable: true,
      },
      {
        ref: "firstName",
        label: "Prénom",
        visible: true,
        sortable: true,
      },
      {
        ref: "lastName",
        label: "Nom",
        visible: true,
        sortable: true,
      },
      {
        ref: "done",
        label: "Remises",
        visible: true,
        sortable: true,
      },
      {
        ref: "total",
        label: "Total",
        visible: true,
        sortable: true,
      },
      {
        ref: "percent",
        label: "Avancement",
        display: (value:number) => { value = Math.round(value); return `<div class="progress"><div class="progress-bar bg-${this.getThemeFromPercent(value)} progress-bar-striped w-${value}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"></div></div>`; },
        visible: true,
        sortable: true,
      },
    ],
    selection: false,
    pagination: true,
    actions: {
      enabled: false,
      add: {enabled: false},
      delete: { enabled: false },
      import: { enabled: false },
      export: { enabled: false },
      actions: (item: any) => [],
      selectionActions: (items: any[]) => []
    }
  };
}
