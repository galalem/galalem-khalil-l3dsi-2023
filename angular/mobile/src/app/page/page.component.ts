import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Page as AbstractPage, AlertDialogComponent, BREADService, DropdownMenuItem } from 'ngx-core';
import { Subscription } from 'rxjs';
import { AppCommonService } from '../app.service';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'abstract-page',
  template: '<p>Hello World</p>',
})
export class Page<Model> extends AbstractPage<Model> {
  
  userinfo:any;
  private userinfoSubscription:Subscription;
  

  constructor(
    protected service: AppCommonService,
    http: BREADService<Model>,
    protected router: Router,
    route: ActivatedRoute,
    protected dialog: MatDialog,
    element: ElementRef,
    protected cdref: ChangeDetectorRef
  ){ 
    super(service, http, route, element);
    this.userinfoSubscription = this.service.userinfo.subscribe((info:any) => this.userinfo = {...info, picture: info.picture ? this.http.base + "/" + info.picture : undefined});
    this.onCreate();
  }

  
/*
  protected override defaultHandleError(error: HttpErrorResponse) {
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

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }*/

  protected onCreate() {
    // called within constructor so it can be called without redefining all args
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
  override ngOnDestroy(): void {
    //super.ngOnDestroy();
    this.userinfoSubscription.unsubscribe();
  }


  protected navigate(commands: any[], extras?: NavigationExtras | undefined): Promise<boolean> {
    return this.router.navigate(commands, extras)
  }
}



@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class AppPage extends Page<any> {

  constructor(
    service: AppCommonService,
    http: BREADService<any>,
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog,
    element: ElementRef,
    cdref: ChangeDetectorRef,

    private platform: Platform, 
    private location: Location
  ) {
    super(service, http, router, route, dialog, element, cdref);
  }

  public document = document;

  private _context:any = {
    year: "",
    department: 0,
    period: 0,
    mode: 'Tree' as 'Tree'|'Table'
  } 
  get context() {
    return this._context;
  }
  set context(value:any) {
    this._context.year = value.year;
    this._context.department = value.department;
    this._context.period = value.period;
    this.service.setContext(this._context);
  }
  get mode():'Tree'|'Table' {
    return this._context.mode;
  }
  set mode(value:'Tree'|'Table') {
    this._context.mode = value;
    this.service.setContext(this._context);
  }
  usesContext:boolean|null=false;
  usesMode:boolean=false;
  
  userPanelDropdownItems:DropdownMenuItem[] = [];
  notificationsDropdownItems:DropdownMenuItem[] = [];
  
  notifications:number = 0;
  updateTotalNotifications(){
    this.notifications = this._newPosts;
    this.notificationsDropdownItems = [
      {
        divider: true
      },
      {
        label: this.newPosts + ' nouvelles actualités',
        icon: "newspaper",
        routerLink: ['news']
      },
    ];
  }
  private _newPosts:number = 0;
  set newPosts(value:number){
    this._newPosts = value;
    this.updateTotalNotifications();
  }
  get newPosts():number {
    return this._newPosts;
  }

  refresh($event:any) { 
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/loading', {skipLocationChange: true}).then(() => {
      $event.target.complete(); 
      this.router.navigate([currentUrl], {replaceUrl:true});
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.service.context.subscribe(context => { this._context = context; this.cdref.detectChanges(); });
    this.service.usesContext.subscribe(usesContext => { this.usesContext = usesContext; this.cdref.detectChanges(); });
    this.service.usesMode.subscribe(usesMode => { this.usesMode = usesMode; this.cdref.detectChanges(); });

    this.http.raw().get<number>(this.http.base + "/api/news/posts/notifications").subscribe((count:number) => this.newPosts = count);
        
    this.userPanelDropdownItems = [
      {
        label: 'Mon Profil',
        icon: "user",
        routerLink: ['/profile']
      },    
      {
        divider: true
      },
      {
        label: 'Changer le mot de passe',
        icon: "rotate",
        iconTheme: 'primary',
        onClick: () => this.service.resetPassword()
      },
      {
        label: 'Déconnexion',
        icon: "right-from-bracket",
        theme: 'danger',
        onClick: () => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Déconnexion',
              body: "Êtes-vous sûr de bien vouloir se déconnecter?",
              handler: () => this.service.logout(),
            },
          }); 
        }
      }
    ];

    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(0, () => {
        //const previousUrl = this.location.getState()?.url;
        console.log("HOHOHOHO");
        
        console.log(this.location.getState());
        
        //if (previousUrl === '/login') {
        //  console.log("He wants to go back to login");
        //  
        //} else {
        //  console.log("Just another page");
        //}
        //this.service.onBackPressed();
      });
    });
  }

  override ngOnDestroy(): void {
    this.platform.backButton.unsubscribe();
  }
}

@Component({
  selector: 'app-loading',
  template: '<ion-content><ngx-preloader/></ion-content>',
})
export class LoadingPage extends Page<any> {
  override ngOnInit(): void {
    // don't load
  }
}