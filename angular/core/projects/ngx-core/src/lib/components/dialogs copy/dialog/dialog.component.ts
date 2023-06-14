import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports: [CommonModule]
})
export class AppDialog {
  @ViewChild('element', { static: true }) public dialog!: ElementRef<any>;

  public open() {
    this.dialog.nativeElement.showModal();
  }
  public close() {
    this.dialog.nativeElement.close();
  }
}
