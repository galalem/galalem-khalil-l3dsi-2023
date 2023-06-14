import { Component } from '@angular/core';
import { StatsComponent } from './stats.component';

@Component({
  selector: 'grading-stats-teachers',
  templateUrl: './stats.component.html',
})
export class TeacherStatsComponent extends StatsComponent {

  protected override get ref():string {
    return 'teachers';
  }


  public override ngOnInit() {
    this.dataTableConfig.title = "Avancement de remise des notes par enseignant";
    super.ngOnInit();
  }
}
