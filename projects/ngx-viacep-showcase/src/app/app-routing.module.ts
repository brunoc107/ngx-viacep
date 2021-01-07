import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: 'busca-cep', loadChildren: () => import('./busca-cep/busca-cep.module').then(m => m.BuscaCepModule) },
  { path: 'busca-endereco', loadChildren: () => import('./busca-endereco/busca-endereco.module').then(m => m.BuscaEnderecoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
