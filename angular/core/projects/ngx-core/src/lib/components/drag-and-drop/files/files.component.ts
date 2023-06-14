import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import * as Files from '../../../data/files';
import { DragAndDrop } from '../drag-and-drop.abstract';

@Component({
  selector: 'files-dropzone',
  templateUrl: './files.component.html',
  styleUrls: ['../drag-and-drop.component.css'],
})
export class FilesDragAndDropComponent extends DragAndDrop {

  @ViewChild('container')
  _containerInput?:ElementRef;
  get containerInput(){return this._containerInput?.nativeElement}
  @ViewChild('temporary')
  _temporaryInput?:ElementRef;
  get temporaryInput(){return this._temporaryInput?.nativeElement}

  constructor(private http:HttpClient) {
    super();
  }

  getFileIcon(file:File){
    return "assets/img/files/"+(Files.getFileInfoByMIME(file.type)?.icon) + ".png"
  }

  pluck(file:File){
    return this.value = this.value.filter(f => f != file);
  }

  @Input()
  set preload(urls:string[]|null|undefined|false) {
    if (!urls)
      return;
    urls.forEach(url => this.http.get(url, { responseType: 'blob' }).pipe(catchError((err) => { console.log(err); return throwError(() => new Error("Unable to load file"))}))
      .subscribe((blob:Blob) => {
        let name = url.split('/').pop() || "file";
        let mime = Files.getFileInfoByExtension(name.split(".").pop())?.mime[0];
        this.drop([new File([blob, new Uint16Array([33])], name, {type: mime, lastModified: new Date().getTime()})])
      })
    );
  }

  @Input()
  set ngxModel(value:File[]){ 
    this._value = value || [];
    let overwrite = this.overwrite;
    this.overwrite = true;
    this.drop(this._value, true, false);
    this.overwrite = overwrite;
  }
  get ngxModel(){ return this.value };
  @Output() ngxModelChange = new EventEmitter<File[]>;

  onChange(value:File[]){ this.ngxModelChange.emit(value); }


  @Input()
  set accept(value:string){this._accept=value}
  get accept(){return this._accept}
  @Input() 
  set max(value:number){this._max=value}
  get max(){return this._max}
  @Input() 
  set multiple(value:boolean){this._multiple=value}
  get multiple(){return this._multiple}
  @Input() 
  set overwrite(value:boolean){this._overwrite=value}
  get overwrite(){return this._overwrite}
  @Input() 
  set name(value:string|undefined){this._name=value}
  get name(){return this._name}
}

