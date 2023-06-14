import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BREADService } from 'ngx-core';
import { SecurityService } from 'src/app/services/security-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  items:any[];
  establishment = {
    logo: "",
    name: ""
  };

  constructor(protected router: Router, security:SecurityService, http:BREADService<any>) {
    security.userinfo().subscribe(info => {
      let role = info.roleRaw;
      this.items = router.config
      .filter(r => !(r.data?.['menu']?.disabled) && this.isRouteAllowedForRole(role, r))
      .map((r:Route):any => this.extractMenuFromRoute(role, r));
    })

    http.raw().get<any>(http.base + "/api/administration/establishment").subscribe(res => {
      this.establishment.logo = res.logo;
      this.establishment.name = res.acronym;
    })    
  }

  private extractMenuFromRoute(role:string, route:Route) {
    let children = route.children?.filter((child:Route) => !(child.data?.['menu']?.disabled) && this.isRouteAllowedForRole(role, child)).map((child:Route):any => this.extractMenuFromRoute(role, child));
    return {
      label: route.data?.['menu']?.label || route.title,
      icon: route.data?.['menu']?.icon,
      routerLink: route.data?.['menu']?.routerLink,
      submenu: children?.length == 0 ? undefined : children,
      isOpen: false
    };
  }

  private isRouteAllowedForRole(role:string, route:Route):boolean {
    let allowedRoles = route.data?.['roles'];
    if (allowedRoles === undefined)
      return true;
    if (allowedRoles.length === 0)
      return true;
    return allowedRoles.includes(role);
  }
}
