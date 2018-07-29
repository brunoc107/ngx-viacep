import { Component, OnInit } from '@angular/core';

import {NgxViacepService, Endereco, ErroCep} from '@brunoc/ngx-viacep';

@Component({
  selector: 'app-busca-endereco',
  templateUrl: './busca-endereco.component.html',
  styleUrls: ['./busca-endereco.component.scss']
})
export class BuscaEnderecoComponent implements OnInit {

  uf = '';
  municipio = '';
  logradouro = '';
  enderecos: Endereco[];
  error: boolean;
  errorMessage: string;

  constructor( private viacep: NgxViacepService ) { }

  ngOnInit() {
  }

  public buscarEndereco(): void {

    this.enderecos = [];
    this.error = false;
    this.errorMessage = '';

    this.viacep.buscarPorEndereco(this.uf, this.municipio, this.logradouro).then((enderecos: Array<Endereco>) => {
      this.enderecos = enderecos;
    }).catch((erro: ErroCep) => {
      this.error = true;
      this.errorMessage = erro.message;
    });
  }
}
