import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialog, AlertModule, DataTableModule, DeleteDialog, DetailsModule, DropdownMenuModule, EmptyModule, FormModule, IconsModule, ImagesModule, InfoDialog, TreeViewModule } from 'ngx-core';
import { IonicModule } from '@ionic/angular';
import { DetailsComponent as ClassDetailsComponent } from './classes/details/details.component';
import { ListComponent as SubjectListComponent } from './subjects/list/list.component';
import { DetailsComponent as SubjectDetailsComponent } from './subjects/details/details.component';
import { IndexComponent } from './index/index.component';
import { SchoolingRoutingModule } from './schooling.routes.module';


const components = [
  IndexComponent,
  ClassDetailsComponent,
  SubjectListComponent,
  SubjectDetailsComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    IonicModule, 
    SchoolingRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    AlertModule,
    DataTableModule,
    DetailsModule, 
    DropdownMenuModule, 
    EmptyModule,
    FormModule, 
    IconsModule,
    ImagesModule,
    TreeViewModule,
    InfoDialog
  ],
  exports: [
    //...components
  ],
})
export class SchoolingModule { }
