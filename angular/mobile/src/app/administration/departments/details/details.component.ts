import { Component } from '@angular/core';
import { DateUtils, TreeNode } from 'ngx-core';
import { Department } from '../department.entity';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'department-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent extends Page<Department> {

  entity: Department = new Department();
  levels:TreeNode[] = [];

  override ngOnInit() { 
    this.init('administration/departments', 'administration/departments', 'department-list');
    this.default().read(this.getRouteParam('id'), (response) => {
      this.entity = response;
      this.entity.updatedAt = DateUtils.format(this.entity.updatedAt, "dddd D MMMM YYYY à HH:mm").toLowerCase();

      this.resource('administration/levels/' + this.entity.id);
      this.browse().subscribe((levels:any[]) => 
        this.levels = levels.map(level => { return {id: level.id, value: level, parent: level.parent} as TreeNode }))
    }); 
    super.ngOnInit();
  }
}
