import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgxViacepModule} from '@brunoc/ngx-viacep';

import { BuscaCepComponent } from './busca-cep.component';
import { BuscaCepRoutingModule } from './busca-cep-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxViacepModule,
    BuscaCepRoutingModule
  ],
  declarations: [BuscaCepComponent]
})
export class BuscaCepModule { }
