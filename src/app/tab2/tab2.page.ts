import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  product:any;
  storeID:any = localStorage.getItem('user');
  media:any;
  constructor(
    private api: ApiService,
    public alertController: AlertController,
    private router:Router
    ) {
    this.getProduct()
      this.media = this.api.media;
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getProduct()
      event.target.complete();
    }, 2000);
  }

  getProduct(){
    console.log(this.storeID)
    this.api.getService('productos/'+this.storeID).subscribe( (res:any) =>{
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
  
  editProduct(item){
    console.log(item)
    this.router.navigate(['/details/'+item.id])
  }
}
