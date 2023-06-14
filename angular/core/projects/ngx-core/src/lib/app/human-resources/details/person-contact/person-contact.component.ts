import { Component, Input } from '@angular/core';
import { Person } from '../../entities/person.entity';

@Component({
  selector: 'person-contact',
  templateUrl: './person-contact.component.html',
})
export class PersonContact {

  @Input("person")
  entity: Person = new Person;
}
