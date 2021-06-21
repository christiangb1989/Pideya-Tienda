import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntradosPage } from './entrados.page';

const routes: Routes = [
  {
    path: '',
    component: EntradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntradosPageRoutingModule {}
