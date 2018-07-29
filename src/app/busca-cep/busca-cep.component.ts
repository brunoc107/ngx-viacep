import { Component, OnInit } from '@angular/core';

import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';

@Component({
  selector: 'app-busca-cep',
  templateUrl: './busca-cep.component.html',
  styleUrls: ['./busca-cep.component.scss']
})
export class BuscaCepComponent implements OnInit {

  cep = '';
  endereco: Endereco;
  error: boolean;
  errorMessage: string;

  constructor( private viacep: NgxViacepService ) { }

  ngOnInit() {
  }

  public buscarCep(): void {

    this.endereco = null;
    this.error = false;
    this.errorMessage = '';

    this.viacep.buscarPorCep(this.cep).then((endereco: Endereco) => {
      this.endereco = endereco;
    }).catch((erro: ErroCep) => {
      this.error = true;
      this.errorMessage = erro.message;
    });
  }
}
