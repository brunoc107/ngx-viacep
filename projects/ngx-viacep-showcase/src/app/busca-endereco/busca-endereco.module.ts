import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {SharedModule } from '../shared/shared.module';

import { BuscaEnderecoComponent } from './busca-endereco.component';
import { BuscaEnderecoRoutingModule } from './busca-endereco-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BuscaEnderecoRoutingModule,
    SharedModule
  ],
  declarations: [BuscaEnderecoComponent]
})
export class BuscaEnderecoModule { }
