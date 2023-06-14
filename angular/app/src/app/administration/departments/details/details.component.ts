import { Component } from '@angular/core';
import { DateUtils, DeleteDialogComponent as DeleteDialog, TreeNode } from 'ngx-core';
import { Department } from '../department.entity';
import { PageComponent } from 'src/app/template/page/page.component';
import { Level, LevelDialogComponent } from './level-dialog.component';

@Component({
  selector: 'department-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent extends PageComponent<Department> {

  entity: Department = new Department();
  levels:TreeNode[] = [];
  canEdit = false;

  override ngOnInit() { 
    this.init('administration/departments', 'administration/departments', 'department-list');
    this.default().read(this.getRouteParam('id'), (response) => {
      this.entity = response;
      this.entity.updatedAt = DateUtils.format(this.entity.updatedAt, "dddd D MMMM YYYY à HH:mm").toLowerCase();
      this.refreshLevels();
    }); 
    this.service.userinfo.subscribe(info => this.canEdit = info.roleRaw == 'ADMIN');   
    super.ngOnInit();
  }

  refreshLevels() {
    this.resource('administration/levels/' + this.entity.id);
    this.browse().subscribe((levels:Level[]) => 
      this.levels = levels.map(level => { return {id: level.id, value: {...level, menu: [
        {label:'Insérer un Niveau',icon:'plus',iconTheme:'success',onClick:()=>this.showCreateLevelDialog(level.id)},
        {label:'Modifier',icon:'pen-to-square',iconTheme:'warning',onClick:()=>this.showUpdateLevelDialog(level)},
        {label:'Supprimer',icon:'trash',theme:'danger',onClick:()=>this.showDeleteLevelDialog(level)}
      ]}, parent: level.parent} as TreeNode }))
    this.resource('administration/departments');
  }

  showDeleteDialog(): void {
    this.dialog.open(DeleteDialog, {
      data: {
        subject: "ce département",
        handler: () => this.default().delete(this.entity.id),
      },
    });
  }


  showCreateLevelDialog(parent?:number): void {
    this.dialog.open(LevelDialogComponent, {
      data: {
        levels: this.levels.map(level => level.value),
        parent: parent,
        handler: (level:Level) => {
          this.resource('administration/levels/' + this.entity.id);
          let formData = new FormData();
          formData.append('name', level.name);
          formData.append('acronym', level.acronym);
          if (level.parent) formData.append('parent', level.parent + '');
          this.add(formData).subscribe(() => this.refreshLevels());
          this.resource('administration/departments');
        },
      },
    });
  }
  showUpdateLevelDialog(level:any): void {
    this.dialog.open(LevelDialogComponent, {
      data: {
        levels: this.levels.map(level => level.value),
        level: level,
        handler: (level:Level) => {
          this.resource('administration/levels/' + this.entity.id);
          let formData = new FormData();
          formData.append('name', level.name);
          formData.append('acronym', level.acronym);
          if (level.parent) formData.append('parent', level.parent + '');
          this.edit(level.id, formData).subscribe(() => this.refreshLevels());
          this.resource('administration/departments');
        },
      },
    });
  }

  showDeleteLevelDialog(level:any): void {
    this.dialog.open(DeleteDialog, {
      data: {
        subject: "le niveau «" + level.name + "»",
        handler: () => {
          this.resource('administration/levels/' + this.entity.id);
          this.delete(level.id).subscribe(() => this.refreshLevels());
          this.resource('administration/departments');
        },
      },
    });
  }
}
