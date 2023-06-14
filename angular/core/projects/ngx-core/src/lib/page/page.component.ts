import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { BREADService, HttpObservable } from '../services/bread.service';
import { CommonService, AlertData } from '../services/common.service';
import { filter, Observable, Subscription, throwError } from 'rxjs';
import { AppAlert } from '../../public-api';



@Component({
  selector: 'ngx-page',
  template: '<p>page works!</p>',
})
export abstract class Page<Model> implements OnInit, OnDestroy, AfterViewInit {

  log(obj:any){
    console.log(obj)
  }

  protected defaultHandleError(error: HttpErrorResponse) {
    let message = `Error ${error.status}: ${error.statusText}`;
    if (error.status == 400 && error.error)
      message = `<ul>${Object.values(error.error).map(value => '<li>'+value+'</li>').join('')}</ul>`;
    else if (error.status == 401)
      message = `Votre session est terminée! Veuillez vous-reconnectez.`;
    else if (error.status == 403)
      message = `Vous n'êtes pas autorisé à accéder à cette page!`;
    else if (error.status == 500)
      message = `Quelque chose s'est mal passé sur le serveur! Veuillez signaler la situation à l'administrateur.`;
    else if (error.status > 500)
      message = `Impossible de se connecter au serveur! Veuillez réessayer plus tard.`;
    this.requestAlert(message, error.status, this.target);
    console.log(error);

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private _inited:boolean = false;
  private _rendered:boolean = false;
  private _loading:boolean = false;
  private _pending:HttpObservable<any>[] = []

  @ViewChild('alert') alertElement!:AppAlert;
  alert:AlertData|false = false;
  private target:string;
  private alertSubscription:Subscription;
  

  private indexTarget:string = "";
  private indexRoute:string = "";
  constructor(
    private cs: CommonService,
    protected http: BREADService<Model>,
    protected route: ActivatedRoute,
    element: ElementRef,
  ){ 
    this.target = element.nativeElement.tagName.toLowerCase(); 
    this.alertSubscription = this.cs.alert.pipe(filter(value => value.visible && value.target == this.target)).subscribe((alert) => {
      this.alert = alert;
      this.alertElement?.show(alert.title, alert.message, alert.type);
      alert.visible = false;
      this.cs.setAlert(alert);
		});
    this.http.handleError = (err: any, caught: Observable<any>) => this.defaultHandleError(err);
    this.http.setOnStatusChangeListener((isLoading:boolean) => {
      this._loading = isLoading;
      this.ngPreload();
    });
  }

  ngOnInit(): void {
    this._inited = true;
    this.ngPreload();
  }
  ngAfterViewInit(): void {
    this._rendered = true;
    this.ngPreload();
  }
  ngPreload() {
    this.cs.setLoading(!(this._inited && this._rendered && !this._loading));
  }
  ngOnDestroy(): void {
    //this._rendered = false;
    this.alertSubscription.unsubscribe();
    //this.cs.setLoading(true);
    this.purgeRequests();
  }


  protected abstract navigate(commands: any[], extras?: NavigationExtras | undefined): Promise<boolean>

  protected subscribeToAlert(id:string, callback:(alert:AlertData) => void):Subscription {
    return this.cs.alert.pipe(filter(value => value.visible && value.target == id)).subscribe((alert) => {
      callback(alert);
      alert.visible = false;
      this.cs.setAlert(alert);
		});
  }
  protected showAlert(type:AlertData["type"], title:string, message:string, target:string){
    this.cs.setAlert({
      type:type,
      title: title,
      message: message,
      visible: true,
      target:target
    });
  }
  protected requestAlert(message:string, httpStatusCode:number, target:string){
    let type:"success"|"danger"|"info"|"warning" = "info";
    let title = "Attention!";

    if (httpStatusCode >= 500 && httpStatusCode < 600){
      type = "danger";
      title = "Une ERREUR s'est produite";
    }
    else if (httpStatusCode >= 400 && httpStatusCode < 500)
      type = "warning";
    else if (httpStatusCode >= 200 && httpStatusCode < 300){
      type = "success";
      title = "Succès";
    }

    this.showAlert(type, title, message, target);
  }
  protected getRouteParam(param:string):any {
    return this.route.snapshot.params[param];
  }
  protected resource(res:string): Page<Model> {
    this.http.resource(res);
    return this;
  }
  protected init(resource:string, route:string, target:string){
    this.http.resource(resource);
    this.indexRoute = route;
    this.indexTarget = target;
  }
  protected browse():HttpObservable<Model[]> {
    return this.registerRequest(this.http.browse());
  }
  protected read(id:any):HttpObservable<Model> {
    return this.registerRequest(this.http.read(id));
  }
  protected add(model:Model|FormData):HttpObservable<any> {
    return this.registerRequest(this.http.add(model));
  }
  protected edit(id:any, model:Model|FormData):HttpObservable<any> {
    return this.registerRequest(this.http.edit(id, model));
  }
  protected patch(id:any, model:Model|FormData):HttpObservable<Model|FormData> {
    return this.registerRequest(this.http.patch(id, model));
  }
  protected delete(id:any):HttpObservable<Model> {
    return this.registerRequest(this.http.delete(id));
  }
  private registerRequest<T>(request:HttpObservable<T>):HttpObservable<T>{
    this._pending = this._pending.filter(observable => !observable.done);
    this._pending.push(request);
    return request;
  }
  private purgeRequests() {
    this._pending.forEach(observable => observable.unsubscribe());
    this._pending = [];
  }


  protected default() {
    const extraAction = (action:string, additionalCallback?:() => void) => {
      this.requestAlert(action + " avec success", 200, this.indexTarget);
      this.navigate([this.indexRoute]);
      if (additionalCallback != undefined) additionalCallback();
    }
    return {
      add: (model:Model|FormData, additionalCallback?:() => void) => {
        this.add(model).subscribe(() => { extraAction("Créé", additionalCallback) });
      },
      edit: (id:any, model:Model|FormData, additionalCallback?:() => void) => {
        this.edit(id, model).subscribe(() => { extraAction("Modifié", additionalCallback) });
      },
      patch: (id:any, model:Model|FormData, action:string, additionalCallback?:() => void) => {
        this.patch(id, model).subscribe(() => { extraAction(action, additionalCallback) });
      },
      delete: (id:any, additionalCallback?:() => void) => {
        this.delete(id).subscribe(() => { extraAction("Supprimé", additionalCallback) });
      },

      
      read: (id:any, callback:(model:Model) => void) => {
        this.read(id).subscribe((response) => {
          if (response) 
            callback(response);
          else {
            this.requestAlert("Page Introuvable", 403, this.indexTarget);
            this.navigate([this.indexRoute]);
          }
        });
      }
    }
  }
}
