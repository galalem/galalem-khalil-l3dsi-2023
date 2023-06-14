import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { MatTabsModule } from '@angular/material/tabs';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { ReactionItemComponent } from './reaction-item/reaction-item.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { PipesModule } from '../../pipes/pipes.module';
import { IconsModule } from '../icons/icons.module';
import { ImagesModule } from '../images/image.module';



@NgModule({
  declarations: [
    PostComponent,
    CommentsComponent,
    CommentItemComponent,
    ReactionItemComponent,
    ImageSliderComponent,
    AttachmentsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    IonicModule.forRoot({mode: "ios"}),
    MatTabsModule,
    ImagesModule,
    PipesModule,
    IconsModule
  ],
  exports: [
    PostComponent,
    CommentsComponent,
    CommentItemComponent,
    ReactionItemComponent,
    ImageSliderComponent,
    AttachmentsComponent
  ]
})
export class AnnouncementsModule { }
