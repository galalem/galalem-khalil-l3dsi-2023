import { Component } from '@angular/core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'grades-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends PageComponent<any> {

  subject:any;
  evaluation:any;
  list:any[];

  public override ngOnInit():void {
    
    this.resource("schooling/evaluations");
    this.read("current").subscribe(evaluation => {
      if (!evaluation)
        return
      this.evaluation = evaluation;


      this.service.userinfo.subscribe(info => {
        if (!info.uid)
          return
        
        this.resource('schooling/subjects');
        this.read(this.getRouteParam('id')).subscribe(subject => {
          
          if (subject.teacherId != info.id){
            this.requestAlert("Vous n'êtes pas autorisé à accèder à cette page", 403, "grades-index");
            this.navigate(['/grading']);
            return
          }

          this.subject = subject;
          if (subject.grading)
            this.GRADING_SYSTEM = {
              ...subject.grading, 
              options: JSON.parse(subject.grading.grades), 
              range: JSON.parse(subject.grading.grades)
            }

          this.resource('schooling/classes');
          this.read(subject.classId).subscribe(c => {
            this.subject.className = c.name;
            this.subject.students = (this.subject.shared ? c.students.map((s:any) => s.id) : this.subject.students) ?? [];
            this.list = this.subject.students.map((s:any) => ({id: s, name: "chargement...", grade: { id:undefined as number|undefined, value: undefined as number|undefined, subGrades: this.subject.criteria.map((criterion:any) => ({id: undefined as number|undefined, value: undefined as number|undefined, criterion: criterion})), comment: undefined as string|undefined }}));
          
            this.resource('human-resources/students?ids='+this.subject.students.join(','));
            this.browse().subscribe(response => { 
              this.list = this.list
                .map(item => {
                  let student = response.find(s => s.id == item.id);
                  return {...item, name: student.firstName + ' ' + student.lastName}
                })
                .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            })            
            this.resource('schooling/evaluations/'+evaluation.id+'/subjects/'+this.subject.id);
            this.browse().subscribe(response => { 
              
              this.list = this.list.map(item => {
                
                let grade = response.find(g => g.studentId == item.id);
                if (!grade)
                  return item;

                item.grade.id = grade.id;
                item.grade.value = grade.value;
                item.grade.comment = grade.comment;                

                for(let index=0; index<item.grade.subGrades.length; index++) {
                  let subGrade = grade.subGrades.find((sb:any) => sb.criterion == item.grade.subGrades[index].criterion.id);
                  if (!subGrade)
                    continue;                
                    
                  item.grade.subGrades[index].id = subGrade.id;
                  item.grade.subGrades[index].value = subGrade.value;
                }
                return item;
              }); 
            })
          })
          

        

        })
      });
    })
    super.ngOnInit();
  }

  submit() {
    let grades = this.list
      .filter(item => item.grade.id || item.grade.value || item.grade.comment || item.grade.subGrades.some((sb:any) => sb.id || sb.value))
      .map(item => ({...item.grade, studentId: item.id, 
        subGrades: item.grade.subGrades
          .filter((sb:any) => sb.id || sb.value)
          .map((sb:any) => ({id: sb.id, value: sb.value, criterion: sb.criterion.id}))}))

    this.init('schooling/evaluations/'+this.evaluation.id+'/subjects/'+this.subject.id, 'grading', 'grades-index');
    this.default().add(grades);
  }



  GRADING_SYSTEM = {
    numeric: true,
    options: [""],
    range: {
      min:0,
      max:0,
      step:0.1
    }
  }
}
