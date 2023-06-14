import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';



@NgModule({
  declarations: [
    AlertDialogComponent,
    DeleteDialogComponent,
    DialogComponent,
    InfoDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  exports: [
    AlertDialogComponent,
    DeleteDialogComponent,
    DialogComponent,
    InfoDialogComponent
  ]
})
export class DialogModule { }
