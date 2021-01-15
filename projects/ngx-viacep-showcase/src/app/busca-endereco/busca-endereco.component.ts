import { Component, OnInit } from '@angular/core';

import {
  Endereco,
  CEPError,
  NgxViacepService,
  CEPErrorCode,
} from '@brunoc/ngx-viacep';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-busca-endereco',
  templateUrl: './busca-endereco.component.html',
  styleUrls: ['./busca-endereco.component.scss'],
})
export class BuscaEnderecoComponent implements OnInit {
  uf = '';
  municipio = '';
  logradouro = '';
  enderecos: Endereco[] = [];
  error = false;
  errorMessage = '';

  constructor(private viacep: NgxViacepService) {}

  ngOnInit() {}

  public buscarEndereco(): void {
    this.enderecos = [];
    this.error = false;
    this.errorMessage = '';

    this.viacep
      .buscarPorEndereco(this.uf, this.municipio, this.logradouro)
      .pipe(
        catchError((erro: CEPError) => {
          this.error = true;
          this.errorMessage = erro.message;

          switch (erro.getCode()) {
            case CEPErrorCode.UF_VAZIA:
              this.errorMessage = 'Por favor, informe a UF :)';
              break;
            case CEPErrorCode.UF_MUITO_CURTA:
              this.errorMessage = 'A UF informada é muito curta :/';
              break;
            case CEPErrorCode.UF_MUITO_LONGA:
              this.errorMessage = 'A UF informada é longa demais :P';
              break;
            case CEPErrorCode.UF_NAO_EXISTE:
              this.errorMessage = `Qual estado tem a sigla "${this.uf}"??`;
              break;

            case CEPErrorCode.MUNICIPIO_VAZIO:
              this.errorMessage = 'Por favor, informe o município :)';
              break;
            case CEPErrorCode.MUNICIPIO_MUITO_CURTO:
              this.errorMessage =
                'Por favor, digite pelo menos três letras do município :3';
              break;

            case CEPErrorCode.LOGRADOURO_VAZIO:
              this.errorMessage = 'Por favor, informe o logradouro :)';
              break;
            case CEPErrorCode.LOGRADOURO_MUITO_CURTO:
              this.errorMessage =
                'Por favor, digite pelo menos três letras do logradouro :3';
              break;

            default:
              this.errorMessage = 'Erro ao buscar os endereços :O';
          }
          return EMPTY;
        })
      )
      .subscribe((enderecos: Array<Endereco>) => {
        this.enderecos = enderecos;
      });
  }
}
