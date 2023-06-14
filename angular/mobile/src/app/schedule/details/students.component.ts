import { Component } from '@angular/core';
import { DetailsComponent } from './details.component';

@Component({
  selector: 'app-shedule-students-details',
  templateUrl: './details.component.html',
})
export class StudentDetailsComponent extends DetailsComponent {

  protected override get ref():string { return 'students' };
  protected override get selector():string { return 'app-shedule-students-list' };
  protected override get displayTargetAs():"teacher"|"class"|undefined { return "teacher" };

}
