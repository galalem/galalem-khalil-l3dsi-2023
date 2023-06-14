import { Component } from '@angular/core';
import { StatsComponent } from './stats.component';

@Component({
  selector: 'grading-stats-students',
  templateUrl: './stats.component.html',
})
export class StudentStatsComponent extends StatsComponent {

  protected override get ref():string {
    return 'students';
  }


  public override ngOnInit() {
    this.dataTableConfig.title = "Avancement de remise des notes par élève";
    super.ngOnInit();
  }
}
