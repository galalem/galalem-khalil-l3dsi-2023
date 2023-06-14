import { Component } from '@angular/core';
import { DataTableConfig } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'grades-index',
  templateUrl: './index.component.html',
})
export class IndexComponent extends PageComponent<any> {

  evaluation:any;
  list:any[] = [];
  percent = 0;
  grades = 0;
  total = 0;

  public override ngOnInit():void {
    this.resource("schooling/evaluations");
    this.read("current").subscribe(evaluation => {
      console.log(evaluation);
      
      this.evaluation = evaluation;
      if (!evaluation)
        return

      this.service.userinfo.subscribe(info => {
        if (!info.uid)
          return
        
        this.resource('schooling/evaluations/'+evaluation.id+'/progress/teachers/'+info.id);
        this.browse().subscribe(response => { 
          this.list = response.map(item => ({...item, percent: item.done * 100 / item.total})); 
          let {done, total} = this.list.reduce((a,b) => ({done: a.done + b.done, total: a.total + b.total}), {done:0, total:0});
          this.grades = done;
          this.total = total;
          this.percent = total == 0 ? 0 : done * 100 / total;
          this.resource('schooling/subjects?ids='+response.map(res => res.id).join(','));
          this.browse().subscribe(subjects => {
            this.list = this.list.map(item => {
              let subject = subjects.find(s => s.id == item.id);
              return {...item, label: subject.label, classId: subject.classId};
            });
            this.resource('schooling/classes?ids='+[...new Set(subjects.map(s => s.classId))].join(','));
            this.browse().subscribe(classes => {
              this.list = this.list.map(item => ({...item, className: classes.find(c => c.id == item.classId).name}));
            })
          })
        })
      });
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
    title: "Matières enseignées",
    columns: [
      {
        ref: "id",
        label: "No.",
        visible: true,
        sortable: true,
      },
      {
        ref: "label",
        label: "Libelle",
        visible: true,
        sortable: true,
      },
      {
        ref: "className",
        label: "Classe",
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
      enabled: true,
      add: {enabled: false},
      delete: { enabled: false },
      import: { enabled: false },
      export: { enabled: false },
      actions: (item: any) => [
        {
          label: "Rendre des notes",
          icon: "marker",
          iconTheme: "primary",
          routerLink: '/grading/grades/'+item.id
        }
      ],
      selectionActions: (items: any[]) => []
    }
  };
}
