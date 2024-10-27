import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarCompraPageRoutingModule } from './confirmar-compra-routing.module';

import { ConfirmarCompraPage } from './confirmar-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarCompraPageRoutingModule
  ],
  declarations: [ConfirmarCompraPage]
})
export class ConfirmarCompraPageModule {}
