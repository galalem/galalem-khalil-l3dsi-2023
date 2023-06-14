import { Component } from '@angular/core';
import { Teacher } from 'ngx-core';
import { ScheduleCell, data } from 'src/app/template/components/schedule/schedule.component';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'app-shedule-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent extends PageComponent<any> {

  public intervals:number = 60;
  public start:number = 480;
  public end:number = 1080;
  public data:ScheduleCell[] = [];

  protected get ref():string { return '' };
  protected get selector():string { return '' };
  protected get displayTargetAs():"teacher"|"class"|undefined { return undefined };

  override ngOnInit(): void {
    this.service.setUsesContext(null);
    this.service.context.subscribe(ctx => {      
      this.init('schooling/'+ctx.period+'/sessions/'+this.ref+'/'+this.getRouteParam('id'), 'schedule/'+this.ref, this.selector);
      this.browse().subscribe((res) => {
        let ids = [...new Set(this.displayTargetAs == "teacher" ? res.map(s => s.teacherId) : res.map(s => s.classId))];
        this.resource((this.displayTargetAs == "teacher" ? 'human-resources/teachers' : 'schooling/classes') + '?ids=' + ids.join(','));
        this.browse().subscribe(targets => {
          this.data = res.map(session => {
            let target:any = targets.find(n => n.id == (this.displayTargetAs == "teacher" ? session.teacherId : session.classId));
            if (this.displayTargetAs == "teacher") target = Teacher.copy(target);
            let targetName = this.displayTargetAs == "teacher" ? target.localeCivility(true) + ' ' + target.name() : target.name;
            return {
              subject: session.label,
              target: targetName,
              place: session.place,
              start: session.start,
              end: session.end,
              fortnight: session.fortnight === null ? undefined : (session.fortnight ? 'A' : 'B'),
              color: session.color
            }
          });
          console.log(this.data);
          this.data = data;
        })        
      })
    })
    super.ngOnInit();
  }

  public days: { label: string; checked: boolean; }[] = [
    { label: "Lundi", checked: true },
    { label: "Mardi", checked: true },
    { label: "Mercredi", checked: true },
    { label: "Jeudi", checked: true },
    { label: "Vendredi", checked: true },
    { label: "Samedi", checked: true },
    { label: "Dimanche", checked: false }
  ];
  public rows:string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  onCheckboxChange(index: number): void {
    const checked = this.days[index].checked;

    if (checked) {
      for (let i = 0; i <= index; i++) {
        this.days[i].checked = true;
      }
    } else {
      for (let i = index; i < this.days.length; i++) {
        this.days[i].checked = false;
      }
    }

    this.rows = this.days.filter(day => day.checked).map(day => day.label);
  }

  extractTime(event:any):number {
    let array = event.target.value.split(':');
    return (parseInt(array[0]) * 60) + parseInt(array[1])
  }
}
