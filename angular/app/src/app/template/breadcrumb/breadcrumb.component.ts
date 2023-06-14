import { Component, Input } from '@angular/core';

export interface Breadcrumb {
  label: string;
  routerLink: any|undefined;
  active:boolean|undefined;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {

  @Input("src")
  breadcrumb: Breadcrumb[] = [];
}
