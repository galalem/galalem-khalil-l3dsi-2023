import { Component, Input } from '@angular/core';
import { Person } from '../../entities/person.entity';
import { isBlank } from '../../../../utils/strings';

@Component({
  selector: 'person-about',
  templateUrl: './person-about.component.html',
})
export class PersonAbout {

  @Input("person")
  entity: Person = new Person;

  isBlank = isBlank;
}
