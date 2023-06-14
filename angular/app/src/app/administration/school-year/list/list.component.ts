import { Component } from '@angular/core';
import { DateUtils, NumberUtils } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'school-year-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends PageComponent<any> {

  data:any[];
  departments: any[];

  override ngOnInit(): void {
    this.init('administration/periods', 'administration/school-year', 'school-year-list');
    this.browse().subscribe((periods:any[]) => {
      let data:any = {};
      periods.forEach((period:any) => {
        if (!data[period.year])
          data[period.year] = {year: period.year, departments: {}};
        if (!data[period.year].departments[period.departmentId]?.length)
          data[period.year].departments[period.departmentId] = [];

        data[period.year].departments[period.departmentId].splice(NumberUtils.sortedIndex(data[period.year].departments[period.departmentId], period, (a, b) => a.startsAt > b.startsAt ? 1 : -1), 0, period);
      });

      this.data = Object.values(data).sort((a:any, b:any) => a.year < b.year ? 1 : -1);

      console.log(this.data)

    });
    this.resource('administration/departments');
    this.browse().subscribe(result => this.departments = result);
    super.ngOnInit();
  }

  formatDate(date:string) {
    return DateUtils.format(date, "DD/MM/YYYY");
  }
}
