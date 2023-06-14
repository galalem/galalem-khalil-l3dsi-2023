import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type AlertData = {
    type: "danger" | "info" | "success" | "warning";
    title: string;
    message: string;
    visible: boolean;
    target: string
}

export type Context = {
    year:string;
    department:number;
    period:number;
    mode: "Tree" | "Table";
}

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() {
        let context = localStorage.getItem("ngx-context");
        if (context)
          this._context.next(JSON.parse(context));
    }

    private _context = new BehaviorSubject<Context>({
      year:"",
      department:0,
      period:0,
      mode:'Tree',
    });
    public get context(){ return this._context.asObservable(); }
    setContext(value:Context){
      this._context.next(value);
      localStorage.setItem('ngx-context', JSON.stringify(value));
    }
  
  
    private _usesContext = new BehaviorSubject<boolean|null>(false);
    public get usesContext(){ return this._usesContext.asObservable(); }
    setUsesContext(value:boolean|null){
      this._usesContext.next(value);
    }
  
    private _usesMode = new BehaviorSubject<boolean>(false);
    public get usesMode(){ return this._usesMode.asObservable(); }
    setUsesMode(value:boolean){
      this._usesMode.next(value);
    }

    private _loading = new BehaviorSubject<Boolean>(false);
    public get loading() { return this._loading.asObservable(); }
    public setLoading(value: Boolean) {
        if (value != this._loading.value)
            this._loading.next(value);
    }

    private _alert = new BehaviorSubject<AlertData>({
        type: "success",
        title: "",
        message: "",
        visible: false,
        target: ""
    });
    public get alert() { return this._alert.asObservable(); }
    public setAlert(value: AlertData) {
        this._alert.next(value);
    }

}