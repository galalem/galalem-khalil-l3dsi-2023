import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'grading-sessions-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends PageComponent<any> {

  @ViewChild('formCtrl', {static:false}) formCtrl:NgForm;
  entity:any = {};

  override ngOnInit() {   
    this.init('schooling/evaluations', 'grading/sessions', 'grading-sessions-list');
    this.service.setUsesContext(null);
    this.service.context.subscribe(ctx => {
      let id = this.getRouteParam('id');
      if (id) 
        this.default().read(id, (response) => {this.entity = {...response, period: ctx.period}; console.log(this.entity);
        });
      else
        this.entity.period = ctx.period;
    })

    super.ngOnInit();
  }

  submit() {

    if (this.formCtrl.invalid)
      return;
      
    let formData = new FormData();
    formData.append("label", this.entity.label);
    formData.append("period", this.entity.period);
    formData.append("start", this.entity.start.substring(0, 10));
    formData.append("end", this.entity.end.substring(0, 10));
    formData.append("deadline", this.entity.deadline.substring(0, 10));

    if (this.entity.id)
      this.default().edit(this.entity.id, formData);
    else
      this.default().add(formData)

  }
}
