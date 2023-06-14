import { Component } from '@angular/core';
import { DetailsComponent } from './details.component';

@Component({
  selector: 'app-shedule-teachers-details',
  templateUrl: './details.component.html',
})
export class TeacherDetailsComponent extends DetailsComponent {

  protected override get ref():string { return 'teachers' };
  protected override get selector():string { return 'app-shedule-teachers-list' };
  protected override get displayTargetAs():"teacher"|"class"|undefined { return "class" };

}
