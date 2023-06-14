import { Component } from '@angular/core';
import { SelectOption } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent extends PageComponent<any> {

  public GRADING_OPTIONS:SelectOption[] = [];

  grading?:number;

  override ngOnInit(): void {
    this.resource('schooling/gradings');
    this.browse().subscribe(gradings => this.GRADING_OPTIONS = gradings.map(g => ({label: g.label, value: g.id})));
    super.ngOnInit();
  }

  submit() {

  }
}
