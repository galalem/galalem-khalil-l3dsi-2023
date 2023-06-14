import { Component, Input } from '@angular/core';
import * as Files from '../../../data/files';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent {
  private _items:any[] = [];
  @Input()
  set items(value:string[]) {
    this._items = value.map(link => {
      let filename = link.split('/').pop();
      return {
        image: 'assets/img/files/'+Files.getFileInfoByExtension(filename?.split('.').pop()).icon + '.png',
        link: link,
        name: filename
      }
    });
  }
  get items():any[] {
    return this._items;
  }
}
