import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarCompraPage } from './confirmar-compra.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarCompraPageRoutingModule {}
