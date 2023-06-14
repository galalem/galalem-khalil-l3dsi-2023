import { Component } from '@angular/core';
import { Teacher } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'grades-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent extends PageComponent<any> {

  list:any[] = [];

  override ngOnInit(): void {
    this.service.userinfo.subscribe(info => {
      if (!info.uid)
        return
      
      this.resource('schooling/evaluations/'+(this.getRouteParam('id') ?? 4)+'/students/'+info.id);
      this.browse().subscribe(grades => {
        let gradesAsClasses:any = {};
        grades.forEach(grade => {
          let classId = grade.subject.classId;
          if (classId in gradesAsClasses)
            gradesAsClasses[classId].push(grade);
          else
            gradesAsClasses[classId] = [grade];
        });
        this.list = Object.entries(gradesAsClasses).map(entry => ({id: entry[0], grades: entry[1]}))
        this.resource('schooling/classes?ids='+this.list.map(item => item.id).join(','))
        this.browse().subscribe(classes => {
          for (let i = 0; i < this.list.length; i++) {
            let c = classes.find(_c => _c.id == this.list[i].id);
            this.list[i].name = c.name;
            this.list[i].acronym = c.acronym;
          }
        });
        this.resource('human-resources/teachers?ids='+grades.map(item => item.subject.teacherId).join(','))
        this.browse().subscribe(teachers => {
          for (let i = 0; i < this.list.length; i++) {
            for (let j = 0; j < this.list[i].grades.length; j++) 
              this.list[i].grades[j].subject.teacher = Teacher.copy(teachers.find(t => t.id == this.list[i].grades[j].subject.teacherId));
          }
        });
      })
    });
    super.ngOnInit();
  }

}
