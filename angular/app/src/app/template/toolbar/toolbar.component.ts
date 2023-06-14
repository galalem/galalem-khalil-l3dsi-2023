import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SecurityService } from 'src/app/services/security-api.service';
import { PageCommonService } from '../page/page-common.service';
import { BREADService, DropdownMenuItem } from 'ngx-core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {

  userPanelDropdownItems:DropdownMenuItem[];
  notificationsDropdownItems:DropdownMenuItem[];

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

  profile:any = {
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    full_name: "",
    username: "",
    role: ""
  }

  notifications:number = 0;
  updateTotalNotifications(){
    this.notifications = this._newPosts;
    this.notificationsDropdownItems = [
      {
        divider: true
      },
      {
        label: this.newPosts + ' nouvelles actualités',
        icon: 'newspaper',
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

  constructor(
    @Inject(DOCUMENT) private document: any,
    private security:SecurityService, 
    private service:PageCommonService, 
    private cdref: ChangeDetectorRef, 
    private http:BREADService<any>){
  }

  ngOnInit() {
    this.elem = this.document.documentElement;
    this.security.userinfo().subscribe((value) => {      
      this.profile = value;       
      this.service.setUserinfo({
        id: value.id,
        uid: value.uid,
        name: value.full_name,
        username: value.username,
        role: value.role,
        roleRaw: value.roleRaw,
        picture: value.picture
      });
    });

    this.service.context.subscribe(context => { this._context = context; this.cdref.detectChanges(); });
    this.service.usesContext.subscribe(usesContext => { this.usesContext = usesContext; this.cdref.detectChanges(); });
    this.service.usesMode.subscribe(usesMode => { this.usesMode = usesMode; this.cdref.detectChanges(); });
    
    this.http.raw().get<number>(this.http.base + '/api/news/posts/notifications').subscribe((count:number) => this.newPosts = count);
    this.userPanelDropdownItems = [
      {
        label: 'Mon Profil',
        icon: 'user',
        routerLink: ['/profile']
      },  
      {
        divider: true
      },
      {
        label: 'Changer le mot de passe',
        icon: 'rotate',
        iconTheme: 'primary',
        href: this.security.resetPasswordUrl()
      },
      {
        label: 'Déconnexion',
        icon: 'right-from-bracket',
        theme: 'danger',
        href: this.security.logoutUrl()
      }
    ];
  }


  windowWidth = window.innerWidth;
  onResize() {
    this.windowWidth = window.innerWidth;
    this.isFullScreen = window.innerHeight == screen.height;
  }
  toggleSidebar() {
    if (this.windowWidth >= 992) {
      document.body.classList.toggle('sidebar-collapse');
      document.body.classList.remove('sidebar-open');
    } else {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.remove('sidebar-collapse');
    }
    setTimeout(() => { window.dispatchEvent(new Event('content-resize')); }, 400);
  }

  elem:any;
  isFullScreen:boolean = false;
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
