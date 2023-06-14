import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDragAndDropComponent } from './image/image.component';
import { FilesDragAndDropComponent } from './files/files.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ImageDragAndDropComponent,
    FilesDragAndDropComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ImageDragAndDropComponent,
    FilesDragAndDropComponent
  ]
})
export class DragAndDropModule { }
