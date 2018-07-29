import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { BuscaEnderecoComponent } from './busca-endereco.component';
import { BuscaEnderecoRoutingModule } from './busca-endereco-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BuscaEnderecoRoutingModule,
    NgxViacepModule
  ],
  declarations: [BuscaEnderecoComponent]
})
export class BuscaEnderecoModule { }
