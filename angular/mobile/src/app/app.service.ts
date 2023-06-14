import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { AuthService } from './keycloak/auth.service';
import { CommonService } from 'ngx-core';

export type AlertData = {
  type: "danger"|"info"|"success"|"warning";
  title:string;
  message:string;
  visible:boolean;
  target:string
}

export type UserInfo = {
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
export class AppCommonService extends CommonService {

  constructor(private auth:AuthService, private platform: Platform, private alertController: AlertController) { 
    super();
  }

  // Keycloak
  public login(username:string, password:string, fail:(unauthorized:boolean)=>void) {
    this.setLoading(true);
    this.auth.login(username, password, (unauthorized) => { this.setLoading(false); fail(unauthorized); });
  }
  public resetPassword() {
    this.auth.resetPassword();
  }
  public forgotPassword() {
    this.auth.forgotPassword();    
  }
  public logout() {
    this.auth.logout();
  }
  public get userinfo(){ 
    return this.auth.userinfo;
  }


  public async onBackPressed() {
    const alert = await this.alertController.create({
      header: 'Quitter',
      message: 'Voulez-vous vraiment quitter l\'application?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Quitter',
          handler: () => {
            this.exit(); // Exit the application
          },
        },
      ],
    });
  
    await alert.present();
  }

  public exit() {
    (navigator as any)['app'].exitApp()
  }
}
