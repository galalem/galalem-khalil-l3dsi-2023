import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent, NodesDirective } from './tree-view.component';

@NgModule({
  declarations: [
    TreeViewComponent,
    NodesDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TreeViewComponent,
    NodesDirective
  ]
})
export class TreeViewModule { }
