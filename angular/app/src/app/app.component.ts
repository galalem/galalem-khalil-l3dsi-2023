import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  windowWidth = window.innerWidth;
  onResize(event:any) {
    this.windowWidth = event.target.innerWidth;
    this.toggleSidebar();
  }
  onScroll($event:any){
    window.dispatchEvent(new Event('ion-scroll'))
  }
  toggleSidebar() {
    if (this.windowWidth >= 768) 
      document.body.classList.add('sidebar-collapse');
    document.body.classList.remove('sidebar-open');
  }
}
