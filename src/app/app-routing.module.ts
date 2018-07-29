import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'busca-cep', loadChildren: 'src/app/busca-cep/busca-cep.module#BuscaCepModule'},
  {path: 'busca-endereco', loadChildren: 'src/app/busca-endereco/busca-endereco.module#BuscaEnderecoModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
