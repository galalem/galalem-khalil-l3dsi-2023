import { Component, ViewChild } from '@angular/core';
import { 
  AlertDialog,
  dataTableColumnsFromDefault, 
  DeleteDialog, 
  DropdownMenuItem, 
  InfoDialog, 
  TreeNode,
  Context
} from 'ngx-core';
import { Level } from 'src/app/administration/departments/details/level-dialog.component';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'schooling-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends PageComponent<any> {

  @ViewChild('dialogDelete') deleteDialog:DeleteDialog;
  @ViewChild('dialogInfo') infoDialog:InfoDialog;
  @ViewChild('dialogClassInfo') classInfoDialog:InfoDialog;
  @ViewChild('dialogClassForm') classFormDialog:AlertDialog;

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
    this.browse().subscribe((levels:Level[]) => {
      this.resource('schooling/classes?period=' + this.context.period);
      this.browse().subscribe(response => {
        this.list = response;
        this.nodes = levels.map(level => { return {id: level.id, value: {...level, classes: this.bakeClasses(level)}, parent: level.parent} as TreeNode});
        this.list = this.nodes.map(node => node.value.classes).flat();
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
            label: "Modifier",
            icon: "pen-to-square",
            iconTheme: "warning",
            onClick: () => { this.classEntity = c; this.classFormDialog.show(); }
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
            //href: 'schooling/classes/' + c.id + '/subjects',
            //blank: true,
          },
          {
            divider: true
          },
          {
            label: "Supprimer",
            icon: "trash",
            theme: "danger",
            onClick: () => {
              if (c.students > 0)
              this.infoDialog.open({
                title: "Attention",
                body: "Impossible de supprimer la classe «" + c.name + "» à cause des " + c.students + " élèves dépendants.<br>Veuillez désaffecter les élèves avant de poursuivre.",
              });
              else
              this.deleteDialog.open({
                subject: "la classe «" + c.name + "»",
                handler: () => {
                  this.resource('schooling/classes');
                  this.delete(c.id).subscribe(() => this.refresh());
                }
              });
            }
          },
        ] as DropdownMenuItem[]
      }
    })
  }

  showCreateClassDialog(level:any) {
    let index = this.list.reduce((sum, c) => sum + (c.levelId === level.id ? 1 : 0), 1);
    this.classEntity = {id: 0, name: "", acronym: "", about: "", levelId: level.id};
    this.classEntity.name = level.name + " " + index;
    this.classEntity.acronym = level.acronym + " " + index;
    this.classFormDialog.show();
    console.log(level);
  }
  createClass(c:any) {
    let data = new FormData();
    data.append("name", c.name);
    data.append("acronym", c.acronym);
    data.append("about", c.about);
    data.append("levelId", c.levelId + "");
    data.append("periodId", this.context.period + "");
    this.resource('schooling/classes');
    this.add(data).subscribe(() => this.refresh());
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
      selectionActions: (items:any[]) => [
        {
          label: "Supprimer",
          icon: "trash",
          theme: "danger",
          onClick: () => {
            if (items.some(item => item.students > 0))
            this.infoDialog.open({
              title: "Attention",
              body: "Impossible de supprimer les classes séléctionnées à cause des " + items.map(item => item.students).reduce((sum, elm) => sum + elm) + " élèves dépendants.<br>Veuillez désaffecter les élèves avant de poursuivre.",
            });
            else
            this.deleteDialog.open({
              subject: "les classes séléctionnées",
              handler: () => {
                this.resource('schooling');
                this.delete('classes?ids='+items.map(item => item.id).join(',')).subscribe(() => this.refresh());
              }
            });
          }
        },
      ]
    }
  };
}
