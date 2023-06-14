import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import * as Files from '../../../data/files';
import { DragAndDrop } from '../drag-and-drop.abstract';


@Component({
  selector: 'image-dropzone',
  templateUrl: './image.component.html',
  styleUrls: ['../drag-and-drop.component.css'],
})
export class ImageDragAndDropComponent extends DragAndDrop {

  @ViewChild('container')
  _containerInput?:ElementRef;
  get containerInput(){return this._containerInput?.nativeElement}
  @ViewChild('temporary')
  _temporaryInput?:ElementRef;
  get temporaryInput(){return this._temporaryInput?.nativeElement}

  image:string|false = false;

  constructor(private http:HttpClient) {
    super();
    this.multiple = false;
    this.overwrite = true;
    this.accept="image/*";
  }

  override onChanged($event:any) {
    super.onChanged($event);

    if (this.value.length === 1) {
      var reader = new FileReader(); 
      reader.readAsDataURL(this.value[0]); 
      reader.onload = () => this.image = reader.result ? reader.result.toString() : false;
    } else this.image = false;
      
  }

  @Input()
  set preload(url:string|null|undefined|false) {
    if (!url)
      return;
    this.http.get(url, { responseType: 'blob' }).pipe(catchError((err) => { console.log(err); return throwError(() => new Error("Unable to load image"))}))
      .subscribe((blob:Blob) => {
        let name = url.split('/').pop() || "file";
        let mime = Files.getFileInfoByExtension(name.split(".").pop()||"")?.mime[0];
        this.drop([new File([blob, new Uint16Array([33])], name, {type: mime, lastModified: new Date().getTime()})], true)
      })
  }

  @Input()
  set ngxModel(value:File[]) { 
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
