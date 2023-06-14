import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent {

  breadcrumb: Breadcrumb[];
  title: string;

  constructor(
    private router:Router, activatedRoute: ActivatedRoute,
  ){
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot;
      }),
    ).subscribe(route => {
      this.breadcrumb = route.data['breadcrumb']
      this.title = route.title || ''
    });
  }
}
