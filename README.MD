
# @bruno/ngx-viacep

Implementação da API do serviço [ViaCep](https://viacep.com.br/) para Angular!

## Introdução

Este módulo implementa um serviço para pesquisa de endereços e CEPs utilizando a API gratiuta do ViaCep.

## Instalação

Via npm:

```bash
$ npm install @brunoc/ngx-viacep --save
```

Via yarn:

```bash
$ yarn add @brunoc/ngx-viacep --save
```

## Instruções

No módulo onde for necessário buscar CEP, importar "ViacepModule" e adicionar aos imports, como no exemplo abaixo:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ViacepModule } from '@brunoc/ngx-viacep';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViacepModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

No componente onde a funcionalidade for ser utilizada, importar o serviço "ViacepService" e injetá-lo:

```typescript
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/';

import { ViacepService } from '@brunoc/ngx-viacep';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor( private viacep: ViacepService ) {}

  ngOnInit() {}
}
```
## Buscar endereço por cep
O serviço "ViacepService" possui um método para a busca de endereço por CEP, que retorna uma Promise, seu uso pode ser visto abaixo:
```typescript
this.viacep.buscarPorCep('01001000').then( ( endereco: Endereco ) => {
  // Endereço retornado :)
  console.log(endereco);
}).catch( (error: CepError) => {
  // Alguma coisa deu errado :/
  console.log(error.descricao);
});
```
As interfaces "Endereco" e "CepError" podem ser importadas da mesma maneira que o serviço, como no exemplo:
```typescript
import { ViacepService, Endereco, CepError } from '@brunoc/ngx-viacep';
```
## Busca sem CEP
Para buscar um endereço cujo cep não é conhecido, pode-se utilizar o método a seguir:
```typescript
this.viacep.buscarPorEndereco('rs', 'porto alegre', 'domingos').then( (enderecos: Endereco[]) => {
  // Array de endereços possíveis retornados :D
  console.log(enderecos);
}).catch( (error: CepError) => {
  // Ocorreu algum erro :/
  console.log(error.descricao);
});
```
O método "buscarPorEndereco" faz uma pesquisa e retorna uma lista de endereços no estado e cidade definidos, cujo logradouro possua no nome o valor passado no terceiro argumento.
## License

MIT © [Bruno Carvalho](mailto:brunocarvalho107@gmail.com)