import { ApiService, ApiImage  } from './../api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Platform, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  images: ApiImage[] = [];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  color:any = [];
  descripcion:any;
  descuento:any; 
  galeria:any[] = [];
  medida:any;
  titulo:any;
  imagen:any;
  talla:any = '';
  negocio_id:any;
  precio:any;
  status:any = 1;
  userID:any;
  media:any;
  constructor(
    private route: Router,
    public api:ApiService,
    private activatedRoute:ActivatedRoute,
    public alertController: AlertController,
    private plt: Platform, 
    private actionSheetCtrl: ActionSheetController
    
  ) { 
    this.media = this.api.media;
  }

  ngOnInit() {

    let producID = this.activatedRoute.snapshot.params['id'];
    console.log(producID);
     if(producID>0){
       this.getProduct(producID)
     }
    
    
  }

  getProduct(producID){
    this.api.getService('producto/'+ producID).subscribe( (res:any)=>{

      let info = res.producto;

      this.userID = info.id;
      this.titulo = info.titulo;
      this.color = info.color?JSON.parse(info.color):[];
      this.descripcion = info.descripcion;
      this.descuento = info.descuento;
      this.imagen01 = info.imagen;
      this.imagen02 = info.imagen02;
      this.imagen03 = info.imagen03;
      this.imagen04 = info.imagen04;
      this.imagen05 = info.imagen05;
      this.imagen06 = info.imagen06;
      this.negocio_id = info.negocio_id;
      this.precio =  info.precio;
      this.status = info.status;
      this.talla = info.talla;
      
    }, err =>{
      this.presentAlert();
    })
  }

  save(){
    console.log(this.titulo+"---"+this.imagen01+"---"+this.precio)
    if(!this.titulo || !this.imagen01 || !this.precio){
      alert('Los campos son requeridos');
      return false;
    }

    let param = {
      titulo: this.titulo,
      color: this.color,
      talla: this.talla,
      kilos: this.kilos,
      litros: this.litros,
      metros: this.metros,
      unidad: this.unidad,
      imagen: this.imagen01,
      imagen02: this.imagen02,
      imagen03: this.imagen03,
      imagen04: this.imagen04,
      imagen05: this.imagen05,
      imagen06: this.imagen06,
      descripcion: this.descripcion,
      precio: this.precio,
      descuento: this.descuento,
      negocio_id: localStorage.getItem('user'),
      status: this.status,
    }
    this.api.postService('producto/store', param).subscribe( resp =>{
      console.log(resp);
      this.route.navigate(['/tabs/tab2'])
      
    })
  }
  update(){
    let producID = this.activatedRoute.snapshot.params['id'];
    let ruta = 'https://app.orivalentydesign.live/'
    let param = {
      titulo: this.titulo,
      color: '',
      talla: this.talla,
      kilos: this.kilos,
      litros: this.litros,
      metros: this.metros,
      unidad: this.unidad,
      imagen: this.imagen01.indexOf(ruta) != -1?this.imagen01: ruta+this.imagen01,
      imagen02: this.imagen02.indexOf(ruta)  != -1?this.imagen02: ruta+this.imagen02,
      imagen03: this.imagen03.indexOf(ruta) != -1?this.imagen03: ruta+this.imagen03,
      imagen04: this.imagen04.indexOf(ruta) != -1?this.imagen04: ruta+this.imagen04,
      imagen05: this.imagen05.indexOf(ruta) != -1?this.imagen05: ruta+this.imagen05,
      imagen06: this.imagen06.indexOf(ruta) != -1?this.imagen06: ruta+this.imagen06,
      descripcion: this.descripcion,
      precio: this.precio,
      descuento: this.descuento,
      negocio_id: localStorage.getItem('user'),
      status: this.status,
    }
    this.api.postService('producto/update/'+producID, param).subscribe( resp =>{
      console.log(resp);
      this.route.navigate(['/tabs/tab2'])
      
    })
  }

  deleteProduct(){
    let producID = this.activatedRoute.snapshot.params['id'];
    this.api.getService('producto/delete/'+producID).subscribe( ()=>{
      this.route.navigate(['/tabs/tab2'])
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

  
  async selectImageSource(name) {

    const buttons = [
      {
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera, name);
        }
      },
      {
        text: 'Elegir entre mis imágenes',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos, name);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Subir imágenes',
        icon: 'attach',
        handler: () => {
          this.onClickFile(name)
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar fuente de imagen',
      buttons
    });
    
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onClickFile(name){
    document.getElementById(name).click()
  }

  

  async addImage(source: CameraSource, name) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });
 
    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const imageName = 'producto';

    console.log('load------>',blobData);
    

    this.api.uploadImage(blobData, imageName, image.format).subscribe((newImage: any) => {
      console.log('mmmsss-/////----->',newImage);
      switch (name) {
        case 'imagen01':
          this.imagen01 = 'https://app.orivalentydesign.live/'+newImage.file
          break;
        case 'imagen02':
          this.imagen02 = 'https://app.orivalentydesign.live/'+newImage.file
          break;
        case 'imagen03':
          this.imagen03 = 'https://app.orivalentydesign.live/'+newImage.file
          break;
        case 'imagen04':
          this.imagen04 = 'https://app.orivalentydesign.live/'+newImage.file
          break;
        case 'imagen05':
          this.imagen05 = 'https://app.orivalentydesign.live/'+newImage.file
          break;
        case 'imagen06':
          this.imagen06 = 'https://app.orivalentydesign.live/'+ newImage.file
          break;
        default:
          ''
          break;
      }
    });

  }
  
  kilos:any;
  litros:any;
  metros:any;
  unidad:any;
  kilosEnable;
  litrosEnable;
  metrosEnable;
  unidadEnable;

  enableField(event, name){
    switch (name) {
      case 'kilos':
        this.kilosEnable = event.detail.checked
        break;
      case 'litros':
        this.litrosEnable = event.detail.checked
        break;
      case 'metros':
        this.metrosEnable = event.detail.checked
        break;   
      case 'unidad':
        this.unidadEnable = event.detail.checked
        break; 
      default:
        break;
    }
    console.log(event.detail.checked)
  }
  imagen01:any;
  imagen02:any;
  imagen03:any;
  imagen04:any;
  imagen05:any;
  imagen06:any;

  uploadFile(event) {

    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const positionImagen = target.id
    const file: File = target.files[0];
    //console.log(positionImagen);

    this.api.uploadImageFile(file).subscribe((newImage:any) => {
      console.log(newImage);
      
      switch (positionImagen) {
        case 'imagen01':
          this.imagen01 = newImage.file
          break;
        case 'imagen02':
          this.imagen02 = newImage.file
          break;
        case 'imagen03':
          this.imagen03 = newImage.file
          break;
        case 'imagen04':
          this.imagen04 = newImage.file
          break;
        case 'imagen05':
          this.imagen05 = newImage.file
          break;
        case 'imagen06':
          this.imagen06 = newImage.file
          break;
        default:
          ''
          break;
      }
    });


  }
  
  deleteImage(image: ApiImage, index) {
    this.api.deleteImage(image).subscribe(res => {
      this.images.splice(index, 1);
    });
  }
  //this.b64toBlob(image.base64String, `image/${image.format}`);
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  pickerColor:any;
  selectColor:any;

  addColor(){
    this.color.push(this.pickerColor);
    console.log(this.color);
  }

  deleteColor(item){
    console.log(item);
    this.color.splice(item);
  }
}
