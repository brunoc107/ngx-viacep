import { Component, OnInit } from '@angular/core';

import {
  Endereco,
  CEPError,
  CEPErrorCode,
  NgxViacepService,
} from '@brunoc/ngx-viacep';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-busca-cep',
  templateUrl: './busca-cep.component.html',
  styleUrls: ['./busca-cep.component.scss'],
})
export class BuscaCepComponent implements OnInit {
  cep = '';
  endereco?: Endereco | null;
  error = false;
  errorMessage = '';

  constructor(private viacep: NgxViacepService) {}

  ngOnInit() {}

  public buscarCep(): void {
    this.endereco = null;
    this.error = false;
    this.errorMessage = '';

    this.viacep
      .buscarPorCep(this.cep)
      .pipe(
        catchError((erro: CEPError) => {
          this.error = true;

          switch (erro.getCode()) {
            case CEPErrorCode.CEP_VAZIO:
              this.errorMessage = 'Por favor, informe o CEP :)';
              break;
            case CEPErrorCode.CEP_INVALIDO:
              this.errorMessage = `O CEP "${this.cep}" não é válido :/`;
              break;
            case CEPErrorCode.CEP_MUITO_CURTO:
              this.errorMessage = 'O CEP informado é curto demais :P';
              break;
            case CEPErrorCode.CEP_MUITO_LONGO:
              this.errorMessage = 'O CEP informado é longo demais ¬¬';
              break;
            case CEPErrorCode.CEP_NAO_ENCONTRADO:
              this.errorMessage = `O CEP "${this.cep}" não existe :(`;
              break;
            default:
              this.errorMessage = 'Erro ao buscar o CEP :O';
          }

          return EMPTY;
        })
      )
      .subscribe((endereco: Endereco) => {
        this.endereco = endereco;
      });
  }
}
