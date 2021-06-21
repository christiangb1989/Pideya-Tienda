import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NotificacionService } from './service/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public Platform:Platform,
    public NotificacionService:NotificacionService
    ) {
      this.initConfig();
    }

  initConfig(){
    this.Platform.ready().then(()=>{
      this.NotificacionService.notificacion();
    })
  }
}
