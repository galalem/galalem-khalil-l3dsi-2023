import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  imports: [CommonModule]
})
export class AppClock {

  @ViewChild("watch", { static: true }) watch!:ElementRef<any>;

  status = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  digits = {
    hours: [0],
    minutes: [0],
    seconds: [0]
  }

  @Input()
  set time(value:Date) {
    this.status = {
      hours: value.getHours(),
      minutes: value.getMinutes(),
      seconds: value.getSeconds()
    }
    this.bake()
  }

  bake() {
    this.digits.hours = Array(24).fill(undefined).map((e,i) => (this.status.hours + i) % 24)
    this.digits.minutes = Array(60).fill(undefined).map((e,i) => (this.status.minutes + i) % 60)
    this.digits.seconds = Array(60).fill(undefined).map((e,i) => (this.status.seconds + i) % 60)

    this.watch.nativeElement.style.setProperty('--hours', this.status.hours)
    this.watch.nativeElement.style.setProperty('--minutes', this.status.minutes)
    this.watch.nativeElement.style.setProperty('--seconds', this.status.seconds)
  }
}
