import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  productos:any = [];
  media:any;
  constructor(
    private api: ApiService,
    public alertController: AlertController
    ) {
      this.getOrders();
      this.media = this.api.media;
  }



  getOrders(){
    let userID = localStorage.getItem('user')
    console.log(userID)

    this.api.getService('getOrdersByStore/'+userID).subscribe((res:any)=>{
      this.productos = res;
      console.log(res)
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
