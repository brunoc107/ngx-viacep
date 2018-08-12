import {Component, OnInit} from '@angular/core';

import {Endereco, ErroCep, ErrorValues, NgxViacepService} from '@brunoc/ngx-viacep';

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

      switch (erro.getCode()) {
        case ErrorValues.CEP_VAZIO:
          this.errorMessage = 'Por favor, informe o CEP :)';
          break;
        case ErrorValues.CEP_INVALIDO:
          this.errorMessage = `O CEP ${this.cep} não é válido :/`;
          break;
        case ErrorValues.CEP_MUITO_CURTO:
          this.errorMessage = 'O CEP informado é curto demais :P';
          break;
        case ErrorValues.CEP_MUITO_LONGO:
          this.errorMessage = 'O CEP informado é longo demais ¬¬';
          break;
        case ErrorValues.CEP_NAO_ENCONTRADO:
          this.errorMessage = `O CEP ${this.cep} não existe :(`;
          break;
        default:
          this.errorMessage = 'Erro ao buscar o CEP :O';
      }
    });
  }
}
