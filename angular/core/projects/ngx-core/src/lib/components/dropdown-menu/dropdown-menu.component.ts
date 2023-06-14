import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

export class DropdownMenuItem {
  divider?:boolean;
  disabled?:boolean;
  icon?:string;
  label?:string;
  theme?:string;
  iconTheme?:string;
  iconType?:"solid"|"regular"|"brand";
  href?:string;
  blank?:boolean;
  routerLink?:any;
  routerLinkActive?:string;
  onClick?:() => void;
  checkbox?: {
    checked?:boolean;
    onChange: (checked:boolean) => void; 
  }
}


@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  exportAs: 'dropdown'
})
export class DropdownMenuComponent {

  @ViewChild('menu', { static: true }) public menu!: MatMenu;

  @Input()
  items:DropdownMenuItem[] = [];
  @Input()
  xPosition:"before"|"after"="after";
  @Input()
  yPosition:"above"|"below"="above";

}
