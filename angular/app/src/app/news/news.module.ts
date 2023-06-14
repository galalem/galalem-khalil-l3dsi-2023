import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { 
  AlertModule,
  AnnouncementsModule, 
  DataTableModule,
  DetailsModule, 
  DialogModule, 
  DragAndDropModule, 
  DropdownMenuModule, 
  FormModule, 
  IconsModule,
  ImagesModule,
} from 'ngx-core';
import { AppRoutingModule } from '../app-routing.module';
import { IndexComponent } from './announcements/index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule,
    CKEditorModule,
    MatExpansionModule,
    MatCheckboxModule,
    AlertModule,
    AnnouncementsModule,
    DataTableModule,
    DetailsModule, 
    DialogModule, 
    DragAndDropModule, 
    DropdownMenuModule, 
    FormModule, 
    IconsModule,
    ImagesModule,
  ], 
  exports: [
    IndexComponent
  ]
})
export class NewsModule { }
