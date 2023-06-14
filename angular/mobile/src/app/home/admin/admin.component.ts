import { Component } from '@angular/core';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends Page<any> {

  ages:number[] = [0];
  genders = {
    male:0,
    female:0
  }
  teachers = 0;
  students = 0;
  parents = 0;
  staff = 0;

  currentDate = new Date();
  currentWeather:{
    temperature: number,
    weathercode: 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99,
    time: string
  } = {
    "temperature": 22.1,
    "weathercode": 1,
    "time": ""
  }; 

  override ngOnInit(): void {    
    this.http.raw().get<any[]>(this.http.base + '/api/human-resources/students/stats').subscribe((stats => {
      this.ages = stats.map(p => p.age);  
      var males = stats.reduce((sum, p) => sum + (p.gender === 'FEMALE' ? 0:1), 0);
      this.genders = {male: males, female: stats.length - males};
    }));
    this.http.raw().get<any>('api/open-meteo/v1/forecast?latitude=33.8465738&longitude=10.7203296&current_weather=true').subscribe((weather) => {
      weather.current_weather.time += ":00.000Z";
      this.currentWeather = weather.current_weather
    })
    this.http.raw().get<number>(this.http.base + '/api/human-resources/teachers/count').subscribe(result => this.teachers = result)
    this.http.raw().get<number>(this.http.base + '/api/human-resources/students/count').subscribe(result => this.students = result)
    this.http.raw().get<number>(this.http.base + '/api/human-resources/parents/count').subscribe(result => this.parents = result)
    this.http.raw().get<number>(this.http.base + '/api/human-resources/staff/count').subscribe(result => this.staff = result)
  
    super.ngOnInit();
  }

}
