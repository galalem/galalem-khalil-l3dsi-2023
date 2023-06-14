import { Component } from '@angular/core';
import { DetailsComponent } from './details.component';

@Component({
  selector: 'app-shedule-user-details',
  templateUrl: './details.component.html',
})
export class UserDetailsComponent extends DetailsComponent {

  private _ref:string = '';
  private _displayTargetAs:"teacher"|"class"|undefined;
  private id:any;

  protected override get ref():string { return this._ref };
  protected override get selector():string { return '' };
  protected override get displayTargetAs():"teacher"|"class"|undefined { return this._displayTargetAs };


  public override ngOnInit():void {
    this.service.userinfo.subscribe(info => {
      if (!info.uid)
        return
      
      this.id = info.id;
      switch(info.roleRaw){
        case "TEACHER": 
          this._ref = "teachers";
          this._displayTargetAs = "class";
          break;
        case "STUDENT": 
          this._ref = "students";
          this._displayTargetAs = "teacher";
          break;
      }
      super.ngOnInit();
      this.service.setUsesContext(true);
    });
  }

  protected override getRouteParam(param:string):any {
    if (param == 'id')
      return this.id
    return super.getRouteParam(param); 
  }

}
