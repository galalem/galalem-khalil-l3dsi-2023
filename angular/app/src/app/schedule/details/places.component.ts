import { Component } from '@angular/core';
import { DetailsComponent } from './details.component';

@Component({
  selector: 'app-shedule-places-details',
  templateUrl: './details.component.html',
})
export class PlaceDetailsComponent extends DetailsComponent {

  protected override get ref():string { return 'places' };
  protected override get selector():string { return 'app-shedule-places-list' };
  protected override get displayTargetAs():"teacher"|"class"|undefined { return "class" };

}
