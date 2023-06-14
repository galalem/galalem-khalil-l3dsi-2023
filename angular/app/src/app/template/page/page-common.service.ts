import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'ngx-core';

export type UserInfo = {
  id:string;
  uid:string;
  picture:string;
  username:string;
  name:string;
  role:string;
  roleRaw:string;
}

@Injectable({
  providedIn: 'root'
})
export class PageCommonService extends CommonService {

  private _userinfo = new BehaviorSubject<UserInfo>({
    id: "",
    uid:"",
    picture:"",
    username:"",
    name:"",
    role:"",
    roleRaw:""
  });
  public get userinfo(){ return this._userinfo.asObservable(); }
  setUserinfo(value:UserInfo){
    this._userinfo.next(value);
  }
}
