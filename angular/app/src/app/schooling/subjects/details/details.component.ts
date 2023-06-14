import { Component, ViewChild } from '@angular/core';
import { DeleteDialog, NumberUtils, Teacher } from 'ngx-core';
import { decodeTime, decodeTextColor } from 'src/app/template/components/schedule/schedule.component';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'subject-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent extends PageComponent<any> {

  @ViewChild('deleteDialog') deleteDialog!:DeleteDialog;

  entity:any = {};
  criterion = {
    id: 0,
    name: "",
    reference: "",
  };
  GRADING_OPTIONS:any[] = []

  override ngOnInit(): void {
    this.init("schooling/subjects", "schooling/classes/"+this.getRouteParam('id')+"/subjects", "subject-list");
    this.default().read(this.getRouteParam("subject"), (response) => {
      console.log(response);
      this.entity = response;
      this.entity.textColor = decodeTextColor(response.color)
      this.entity.sessions = response.sessions.sort((a:any,b:any) => a.start - b.start).map((s:any) => ({
        ...s, 
        day: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][NumberUtils.intdiv(s.start, 1440)], 
        start: decodeTime(s.start % 1440), 
        end: decodeTime(s.end % 1440)
      }));
      
      this.resource("schooling/classes/"+response.classId);
      this.browse().subscribe((c) => this.entity.class = c);
      
      this.resource("schooling/gradings");
      this.browse().subscribe((response) => this.GRADING_OPTIONS = response.map(g => ({...g, value:g.id})));
      
      if (response.teacherId){
        this.resource("human-resources/teachers?ids="+response.teacherId);
        this.browse().subscribe((teacher) => this.entity.teacher = teacher[0] ? Teacher.copy(teacher[0]) : undefined)
      }
    });
    super.ngOnInit();
  }

  updateGrading(grading:number) {
    let formData = new FormData();
    this.resource("schooling/subjects");
    this.patch(this.getRouteParam("subject") + '/grading?id='+grading, undefined).subscribe(() => {
      this.entity.grading = this.GRADING_OPTIONS.find(g => g.id == grading);
      this.requestAlert("Le système de notation est mis à jour avec succès!", 200, "subject-details");
    })
  }

  deleteCriterion(c:any) {
    this.deleteDialog.open({
      subject: `le critère «${c.name}»`,
      handler: () => {
        this.init("schooling/criteria", "", "subject-details");
        this.default().delete(c.id);
      },
    })
  }

  createCriterion(c: any) {
    c.name = c.name.trim();
    c.reference = c.reference.trim();
    if (!c.name || !c.reference){
      this.requestAlert("Impossible de " + (c.id ? 'mettre à jour' : 'créer') + " le critère:<br>le champ «Nom» et le champ «Référence» sont obligatoires!", 400, "subject-details");
      return;
    }

    let formData = new FormData;
    formData.append("subjectId", this.getRouteParam("subject"));
    formData.append("name", c.name);
    formData.append("reference", c.reference);
    this.resource("schooling/criteria");
    let httpObservable = c.id ? this.edit(c.id, formData) : this.add(formData);
    httpObservable.subscribe(() => {
      this.requestAlert("Critère " + (c.id ? 'mis à jour' : 'créé') + " avec succès!", 200, "subject-details");
      this.criterion = {
        id: 0,
        name: "",
        reference: "",
      }
    })

  }
}
