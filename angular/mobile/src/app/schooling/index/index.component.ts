import { Component, ViewChild } from '@angular/core';
import { 
  dataTableColumnsFromDefault, 
  DropdownMenuItem, 
  InfoDialog, 
  TreeNode,
  Context
} from 'ngx-core';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'schooling-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends Page<any> {

  @ViewChild('dialogClassInfo') classInfoDialog:InfoDialog;

  list:any[]=[];
  nodes:TreeNode[]=[];
  context:Context;
  classInfo:any = {};
  classEntity = {
    id: 0,
    name: "",
    acronym: "",
    about: "",
    levelId: 0
  };

  override ngOnInit(): void {
    this.service.setUsesContext(true);
    this.service.setUsesMode(true);
    this.service.context.subscribe(context => {
      this.context = context; 
      this.refresh();
    });
    super.ngOnInit();
  }

  refresh() {
    this.resource('administration/levels/' + this.context.department);
    this.browse().subscribe((levels:any[]) => {
      this.resource('schooling/classes?period=' + this.context.period);
      this.browse().subscribe(response => {
        this.list = response;
        this.nodes = levels.map(level => { return {id: level.id, value: {...level, classes: this.bakeClasses(level)}, parent: level.parent} as TreeNode});
        this.list = this.nodes.map(node => node.value.classes);//.flat();
      });
    })

  }

  bakeClasses(level:any) {
    return this.list.filter(c => c.levelId === level.id).map((c, index) => {
      return {
        ...c,
        menu: [
          {
            label: "Info",
            icon: "circle-info",
            iconTheme: "primary",
            onClick: () => { this.classInfo = c; this.classInfoDialog.show(); }
          },
          {
            divider: true
          },
          {
            label: "Élèves",
            icon: "user-group",
            iconTheme: "indigo",
            routerLink: ['classes/' + c.id + '/students']
          },
          {
            label: "Matières",
            icon: "book",
            iconTheme: "indigo",
            routerLink: [`/schooling/classes/${c.id}/subjects`]
          },
        ] as DropdownMenuItem[]
      }
    })
  }

  dataTableConfig = {
    title:'Liste des Classes',
    columns: dataTableColumnsFromDefault({
      ref: "",
      label: "",
      visible: true,
      sortable: true
    },  [
      {
        ref: "id",
        label: "No."
      },
      {
        ref: "name",
        label: "Nom"
      },
      {
        ref: "students",
        label: "Nombre des élèves"
      }
    ]),
    selection: false,
    pagination:true,
    actions: {
      enabled:true,
      add:{enabled:false},
      delete:{enabled:false},
      import:{enabled:false},
      export:{enabled:false},
      actions: (item:any) => item.menu,
      selectionActions: (items:any[]) => []
    }
  };
}
