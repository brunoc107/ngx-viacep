import {Component, OnInit} from '@angular/core';

import {Endereco, ErroCep, NgxViacepService, ErrorValues} from '@brunoc/ngx-viacep';

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

      switch (erro.getCode()) {
        case ErrorValues.UF_VAZIA:
          this.errorMessage = 'Por favor, informe a UF :)';
          break;
        case ErrorValues.UF_MUITO_CURTA:
          this.errorMessage = 'A UF informada é muito curta :/';
          break;
        case ErrorValues.UF_MUITO_LONGA:
          this.errorMessage = 'A UF informada é longa demais :P';
          break;
        case ErrorValues.UF_NAO_EXISTE:
          this.errorMessage = `Qual estado tem a sigla "${this.uf}"??`;
          break;

        case ErrorValues.MUNICIPIO_VAZIO:
          this.errorMessage = 'Por favor, informe o município :)';
          break;
        case ErrorValues.MUNICIPIO_MUITO_CURTO:
          this.errorMessage = 'Por favor, digite pelo menos três letras do município :3';
          break;

        case ErrorValues.LOGRADOURO_VAZIO:
          this.errorMessage = 'Por favor, informe o logradouro :)';
          break;
        case ErrorValues.LOGRADOURO_MUITO_CURTO:
          this.errorMessage = 'Por favor, digite pelo menos três letras do logradouro :3';
          break;

        default:
          this.errorMessage = 'Erro ao buscar os endereços :O';
      }
    });
  }
}
