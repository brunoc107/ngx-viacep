import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { AddressCardComponent } from './address-card/address-card.component';
import { AddressListComponent } from './address-list/address-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgxViacepModule
  ],
  declarations: [AddressCardComponent, AddressListComponent],
  exports: [AddressCardComponent, AddressListComponent]
})
export class SharedModule { }
