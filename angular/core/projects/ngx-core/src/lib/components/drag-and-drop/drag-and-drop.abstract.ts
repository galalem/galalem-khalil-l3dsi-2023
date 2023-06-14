export abstract class DragAndDrop {

  fileOver:boolean = false;
  fileError:boolean = false;
  error:string|undefined = undefined;

  abstract get containerInput():HTMLInputElement;
  abstract get temporaryInput():HTMLInputElement;

  _value: File[] = [];
  get value(): File[] { return this._value; };
  set value(v: File[]) {
    this._value = v;
    this.containerInput.files = fileArrayToFileList(v);
    this.temporaryInput.files = fileArrayToFileList([]);
    this.onChange(v);
  }

  abstract onChange(value:File[]):void;

  onDragover ($event:Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = true;
  }
  onDragleave ($event:Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = false;
  }
  onDrop ($event:any) {
    this.onDragleave($event);
    let files = [];
    for(let i=0; i<$event.dataTransfer.files.length; i++)
      files.push($event.dataTransfer.files[i]);
    this.drop(files);
  }

  onClick($event:any){
    this.temporaryInput.click();
  }

  onSelect ($event:any) {
    let files = [];
    for(let i=0; i<$event.target.files.length; i++)
      files.push($event.target.files[i]);
    this.drop(files);
  }

  onChanged($event?:any) {
    let files = [];
    if (this.containerInput.files != null)
      for(let i=0; i<this.containerInput.files.length; i++)
        files.push(this.containerInput.files[i]);
    this.value = files;
  }
  
  onError(error:string) {
    this.fileError = true;
    this.error = error;
    setTimeout(() => {this.fileError = false; this.error = undefined}, 3000);
  }
  drop (files:File[], forceEmpty:boolean = false, notify:boolean = true) {

    if (!this.containerInput || !this.temporaryInput)
      return

    if (forceEmpty && files.length == 0 && this.overwrite) {
      this.value = [];
      return;
    }

    const TypeRegEx = new RegExp( this.accept.replace( /\*/g, '.\*' ).replace( /\,/g, '|' ) );
    if (files.length <= 0)
      this.onError("Erreur: aucen fichier est trouvé");
    else if (!this.multiple && files.length != 1)
      this.onError("Erreur: un seul fichier est autorisé");
    else if (files.length > this.max)
      this.onError("Erreur: seuil de nombre de fichiers est dépassé");
    else if (!this.overwrite && files.length + (this.containerInput.files?.length || 0) > this.max)
      this.onError("Erreur: seuil de nombre de fichiers est dépassé");
    else if (!files.every((file:File) => TypeRegEx.test(file.type)) )
      this.onError("Erreur: Type non acceptable, format accepté: " + this.accept);
    else {
      if (!this.overwrite && this.containerInput.files != null)
        for(let i=this.containerInput.files.length-1; i>=0; i--)
          files.unshift(this.containerInput.files[i]);
    
      this.value = files;
      if (notify) this.onChanged();
    }
  }


  _accept:string="*"; 
  abstract get accept():string;
  abstract set accept(value:string);
  _max:number=Infinity;
  abstract get max():number;
  abstract set max(value:number);
  _multiple:boolean=false;
  abstract get multiple():boolean;
  abstract set multiple(value:boolean);
  _overwrite:boolean=true;
  abstract get overwrite():boolean;
  abstract set overwrite(value:boolean);
  _name:string|undefined=undefined;
  abstract get name():string|undefined;
  abstract set name(value:string|undefined);
}

export const fileArrayToFileList = function(files:File[]):FileList {
  var b = new ClipboardEvent("").clipboardData || new DataTransfer()
  for (var i = 0, len = files.length; i<len; i++) b.items.add(files[i])
  return b.files
}
export const dataUriToFile = function(data:string, name:string):File{
  return new File([dataUritoBlob(data), new Uint16Array([33])], name, {type: data.split(',')[0].split(':')[1].split(';')[0], lastModified: new Date().getTime()})
}
export const dataUritoBlob = function(data:string):Blob {
  var byteString = atob(data.split(',')[1]); var mimeString = data.split(',')[0].split(':')[1].split(';')[0]; var ab = new ArrayBuffer(byteString.length); var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {ia[i] = byteString.charCodeAt(i);}
  return new Blob([ab], {type: mimeString});
}
