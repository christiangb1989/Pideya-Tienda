import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntradosPageRoutingModule } from './entrados-routing.module';

import { EntradosPage } from './entrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntradosPageRoutingModule
  ],
  declarations: [EntradosPage]
})
export class EntradosPageModule {}
