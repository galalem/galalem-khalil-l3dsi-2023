import { Component } from '@angular/core';
import { DetailsComponent } from './details.component';

@Component({
  selector: 'app-shedule-classes-details',
  templateUrl: './details.component.html',
})
export class ClassDetailsComponent extends DetailsComponent {

  protected override get ref():string { return 'classes' };
  protected override get selector():string { return 'app-shedule-classes-list' };
  protected override get displayTargetAs():"teacher"|"class"|undefined { return "teacher" };

}
