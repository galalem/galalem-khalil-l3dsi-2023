import { Component, ViewChild } from '@angular/core';
import { Page } from 'src/app/page/page.component';
import { DeleteDialog, NumberUtils, Teacher, decodeTime, decodeTextColor } from 'ngx-core';

@Component({
  selector: 'subject-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent extends Page<any> {

  entity:any = {};

  override ngOnInit(): void {
    this.init("schooling/subjects", "schooling/classes/"+this.getRouteParam('id')+"/subjects", "subject-list");
    this.default().read(this.getRouteParam("subject"), (response) => {
      this.entity = response;
      this.entity.textColor = decodeTextColor(response.color)
      this.entity.sessions = response.sessions.sort((a:any,b:any) => a.start - b.start).map((s:any) => ({
        ...s, 
        day: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][NumberUtils.intdiv(s.start, 1440)], 
        start: decodeTime(s.start % 1440), 
        end: decodeTime(s.end % 1440)
      }));
      
      this.resource("schooling/classes/"+response.classId);
      this.browse().subscribe(c => this.entity.class = c);
      
      if (response.teacherId){
        this.resource("human-resources/teachers?ids="+response.teacherId);
        this.browse().subscribe((teacher) => this.entity.teacher = teacher[0] ? Teacher.copy(teacher[0]) : undefined)
      }
    });
    super.ngOnInit();
  }
}
