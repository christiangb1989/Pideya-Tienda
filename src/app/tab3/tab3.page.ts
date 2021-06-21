import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  product:any;
  constructor(
    private api: ApiService,
    public alertController: AlertController
    ) {
    this.getProduct()
  }

  getProduct(){
    this.api.getService('productos/2').subscribe( (res:any) =>{
      this.product = res.product;
    }, err =>{
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

}
