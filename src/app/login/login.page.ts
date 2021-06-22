import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NotificacionService } from '../service/notificacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:any;
  pass:any;
  userId:string;
  constructor(
    public api:ApiService,
    public alertController: AlertController,
    public router:Router,
    public loadingController: LoadingController,
    public NotificacionService:NotificacionService
    ) {
      
      this.userId = this.NotificacionService.userId;
     }

  ngOnInit() {
  }

  submit(){
    this.presentLoading();
    let param = {
      user: this.user,
      pass:this.pass,
      fcm : this.userId
    }
    this.api.postService('storeLogin', param).subscribe( (res:any) =>{      
      if(res.status == true){
        setTimeout(()=>{
          this.loadingController.dismiss();
          localStorage.setItem('user', res.user_data.id)
          this.router.navigate(['tabs/tab1'])

        },1000)
        
      }else{
        this.presentAlert();
      }
      
    }, ()=>{
      this.presentAlert();
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: '¡Ups! Algo salió mal',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'cargando...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
