import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import { ProfilePictureComponent } from './profile-picture.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ImageComponent,
    ProfilePictureComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    ImageComponent,
    ProfilePictureComponent
  ]
})
export class ImagesModule { }
