import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BuscaEnderecoComponent} from './busca-endereco.component';

const routes: Routes = [
  {path: '', component: BuscaEnderecoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscaEnderecoRoutingModule { }
