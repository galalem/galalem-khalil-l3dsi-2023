import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { BACKEND_URL, KEYCLOAK_URL } from 'src/application.properties';
import { PLAYERID_KEY } from '../notifications/one-signal.config';
import OneSignal from 'onesignal-cordova-plugin';

const KEYCLOAK_REALM = KEYCLOAK_URL + "/realms/ngx";
const USERNAME_KEY = "ngxusername";
const PASSWORD_KEY = "ngxpassword";
const REFRESH_TOKEN_BEFORE_SECONDS = 30;
const REQUEST_HEADER = {
  "Skip-Interceptor": "true", 
  "Content-Type": "application/x-www-form-urlencoded"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ROLES = {
    ADMIN: "Administrateur", 
    TEACHER: "Enseignant", 
    STUDENT: "Élève", 
    PARENT: "Parent",
    undefined: ""
  }

  private _loading:boolean=false;
  private _token:string = "";
  private _refreshToken:string = "";
  private tokenExpiresAt:Date = new Date;
  private refreshTokenExpiresAt:Date = new Date;
  private _tokenStack:any[]=[];
  public get token():Promise<string> {
    return new Promise<string>((success, fail) => {
      if (this._loading){
        this._tokenStack.push({success: success, fail: fail});
        return;
      }
      this._loading = true;
      if (!this._token || this.refreshTokenExpired())
        this.reconnect(success, fail);
      else if (this.tokenExpired())
        this.refreshToken(success, fail);
      else {
        success(this._token);
        this._loading = false;
      }
    })
  }
  private _userinfo = {
    id: 0,
    uid: "",
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    name: "",
    username: "",
    gender: "",
    role: "",
    roleRaw: "",
    picture: ""
  };
  private $userinfo = new BehaviorSubject<typeof this._userinfo>(this._userinfo);
  public get userinfo(){ return this.$userinfo.asObservable(); }

  constructor(private http:HttpClient, private router:Router) { }

  public login(username:string, password:string, fail:(unauthorized:boolean)=>void) {
    let formData = new URLSearchParams();
    formData.set("username", username);
    formData.set("password", password);
    formData.set("grant_type", "password");
    formData.set("client_id", "angular-web-app");
    this.http.post<any>(KEYCLOAK_REALM + "/protocol/openid-connect/token", formData.toString(), {headers: REQUEST_HEADER})
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status == 401){
          fail(true);
          return throwError(() => new Error('Invalid User Credentials.'));
        }
        fail(false);
        return throwError(() => new Error('Something bad happened; please try again later.'))
      })).subscribe(async (response) => {
        Preferences.set({ key: USERNAME_KEY, value:username })
        Preferences.set({ key: PASSWORD_KEY, value:password })
        this.decodeResponse(response);   
        OneSignal.getDeviceState((state)=> {
          this.http.post(BACKEND_URL + "/api/news/users/"+this._userinfo.uid + "/device?playerId="+state.userId, {})
            .subscribe(() => this.router.navigate(['/home'], {replaceUrl: true}))
        })
      });
  }

  public forgotPassword(){
    window.open(KEYCLOAK_REALM + '/login-actions/reset-credentials?client_id=angular-web-app&amp;tab_id=npJd_GdJ6vM', '_system', 'location=yes'); 
    return false;
  }
  public resetPassword() {
    window.open(KEYCLOAK_REALM + '/protocol/openid-connect/auth?client_id=angular-web-app&redirect_uri=http://localhost:4200&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD', '_system', 'location=yes');
    return false;
  }
  public logout() {
    Preferences.remove({ key: USERNAME_KEY });
    Preferences.remove({ key: PASSWORD_KEY });
    OneSignal.getDeviceState((state)=> {
      this.http.delete(BACKEND_URL + "/api/news/users/"+this._userinfo.uid + "/device?playerId="+state.userId)
        .subscribe(() => {});
      this.redirect();
    })
  }
  public async session():Promise<boolean> {
    const username = (await Preferences.get({ key: USERNAME_KEY })).value || "";
    const password = (await Preferences.get({ key: PASSWORD_KEY })).value || "";
    const session = !(!username || !password)
    if (!session) 
      this.router.navigate(['/login']);
    return session;
  }

  private tokenExpired():boolean{
    return (new Date()).getTime() > this.tokenExpiresAt.getTime();
  }
  private refreshTokenExpired():boolean{
    return (new Date()).getTime() > this.refreshTokenExpiresAt.getTime();
  }

  private refreshToken(success:(value:string)=>void, fail:()=>void) {
    let formData = new URLSearchParams();
    formData.set("refresh_token", this._refreshToken);
    formData.set("grant_type", "refresh_token");
    formData.set("client_id", "angular-web-app");
    this.http.post<string>(KEYCLOAK_REALM + "/protocol/openid-connect/token", formData.toString(), {headers: REQUEST_HEADER})
      .pipe(catchError((error: HttpErrorResponse) => {
        fail();
        this._tokenStack.forEach((value) => value.fail());
        this.redirect();
        return throwError(() => new Error('Something bad happened; please try again later.'))
      })).subscribe((response) => {
        this.decodeResponse(response);
        success(this._token);
        this._tokenStack = this._tokenStack.filter((request) => {request.success(this._token); return false;});
      });
  }

  private async reconnect(success:(value:string)=>void, fail:()=>void) {
    const username = (await Preferences.get({ key: USERNAME_KEY })).value || "";
    const password = (await Preferences.get({ key: PASSWORD_KEY })).value || "";

    if (!username || !password){
      fail();
      this._tokenStack.forEach((value) => value.fail());
      this.redirect();
      return;
    }

    let formData = new URLSearchParams();
    formData.set("username", username);
    formData.set("password", password);
    formData.set("grant_type", "password");
    formData.set("client_id", "angular-web-app");
    this.http.post<string>(KEYCLOAK_REALM + "/protocol/openid-connect/token", formData.toString(), {headers: REQUEST_HEADER})
      .pipe(catchError((error: HttpErrorResponse) => {
        fail();
        this._tokenStack.forEach((value) => value.fail());
        this.redirect();
        return throwError(() => new Error('Something bad happened; please try again later.'))
      })).subscribe((response) => {
        this.decodeResponse(response);
        success(this._token);
        this._tokenStack = this._tokenStack.filter((request) => {request.success(this._token); return false;});
      });
  }

  private decodeResponse(response:any) {
    this._loading = false;
    this._token = response.access_token;
    this._refreshToken = response.refresh_token;
    this.tokenExpiresAt.setTime(this.makeExpirationTime(response.expires_in));
    this.refreshTokenExpiresAt.setTime(this.makeExpirationTime(response.refresh_expires_in));
    
    if (this._userinfo.uid)
      return;

    let value = JSON.parse(decodeURIComponent(window.atob(this._token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));

    if (!value.role)
      value.role = [undefined];
    else
      value.role = value.role.filter((role:string) => Object.keys(this.ROLES).includes(role))
    
    this._userinfo = {
      id: value.ngx_id,
      uid: value.sub,
      address: "",
      email: value.email,
      first_name: value.given_name,
      last_name: value.family_name,
      name: value.name,
      username: value.preferred_username,
      gender: value.gender,
      role: this.ROLES[value.role[0] as keyof typeof this.ROLES] as string,
      roleRaw: value.role[0],
      picture: value.picture
    }
    this.$userinfo.next(this._userinfo);
  }
  private makeExpirationTime(seconds:number):number {
    return (new Date()).getTime() + ((seconds - REFRESH_TOKEN_BEFORE_SECONDS) * 60)
  }
  private redirect() {
    this.router.navigate(['/login'], {replaceUrl: true});
  }
}
