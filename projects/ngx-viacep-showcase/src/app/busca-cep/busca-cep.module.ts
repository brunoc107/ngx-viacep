import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { BuscaCepComponent } from './busca-cep.component';
import { BuscaCepRoutingModule } from './busca-cep-routing.module';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BuscaCepRoutingModule,
    MarkdownModule
  ],
  declarations: [BuscaCepComponent]
})
export class BuscaCepModule { }
