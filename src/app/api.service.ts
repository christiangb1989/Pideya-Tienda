import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

export interface ApiImage {
  file: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  api:any = 'https://app.pideya.com.pe/api/';
  media:any = 'https://app.pideya.com.pe/';

  constructor(
    private http: HttpClient,
    public alertController: AlertController
    ) { }

  getService(param){
    return this.http.get(this.api+param)
  }

  postService(url, param){
    return this.http.post(this.api+url, param)
  }

  getImages() {
    return this.http.get<ApiImage[]>(`${this.api}/upload`);
  }
  
  uploadImage(blobData, name, ext) {
    const formData = new FormData();
    formData.append('file', blobData, 'myimage.jpeg');
 
    return this.http.post(`${this.api}upload`, formData);
  }
 
  uploadImageFile(file: File) {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('file', file, 'myimage.jpeg');
    //formData.append('name', file.name);
 
    return this.http.post(`${this.api}upload`, formData);
  }
 
  deleteImage(id) {
    return this.http.delete(`${this.api}upload/${id}`);
  }
  
}
