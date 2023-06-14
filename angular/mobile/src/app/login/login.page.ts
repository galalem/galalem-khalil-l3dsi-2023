import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { AppCommonService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  username:string="";
  password:string="";
  failed:boolean = false;

  constructor(private service:AppCommonService, 
    private alertController: AlertController, 
    private platform: Platform) { 
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(0, () => {        
        this.service.onBackPressed();
      });
    });
  }

  ngOnDestroy(): void {
    this.platform.backButton.unsubscribe();
  }

  login() {
    this.service.login(this.username, this.password, (unauthorized:boolean) => {
      if (unauthorized)
        this.failed = true;
      else
        this.presentToastError();
    });
  }

  async presentToastError() {
    const toast = await this.alertController.create({
      header: 'Attention',
      message: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion Internet et/ou réessayer plus tard',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        },
      ]
    });
    toast.present();
  }
  forgotPassword(){
    return this.service.forgotPassword();
  }
}
