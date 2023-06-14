import { Component, Input } from '@angular/core';
import { Person, Gender } from '../../entities/person.entity';

@Component({
  selector: 'person-identity',
  templateUrl: './person-identity.component.html',
})
export class PersonIdentity {

  FEMALE = Gender.FEMALE;

  @Input("person")
  entity: Person = new Person;
}
