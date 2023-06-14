import { Component, Input } from '@angular/core';
import { Student } from '../../entities/student.entity';

@Component({
  selector: 'student-contact',
  templateUrl: './student-contact.component.html',
})
export class StudentContact {

  @Input("student")
  entity: Student = new Student;
}
