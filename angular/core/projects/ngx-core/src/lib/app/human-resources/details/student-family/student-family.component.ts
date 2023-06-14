import { Component, Input } from '@angular/core';
import { Student } from '../../entities/student.entity';

@Component({
  selector: 'student-family',
  templateUrl: './student-family.component.html',
})
export class StudentFamily {

  @Input("student")
  entity: Student = new Student;
}
