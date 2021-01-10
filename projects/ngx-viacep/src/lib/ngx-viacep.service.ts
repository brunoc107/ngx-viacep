import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Endereco } from '@models/endereco';
import { CEPErrorCode } from '@models/cep-error-code';
import { CEPError } from '@models/cep-error';
import { BASE_URL } from '@models/constantes';
import {
  validarCEP,
  validateState,
  validateStreet,
  validateTown,
} from './utils';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NgxViacepService {
  constructor(private http: HttpClient) {}

  /**
   * Busca o endereço a partir do CEP
   *
   * @param cep
   */
  buscarPorCep(cep: string): Observable<Endereco> {
    return of(cep).pipe(
      validarCEP(),
      switchMap((cepValido) =>
        this.http.get<Endereco>(`${BASE_URL}/${cepValido}/json`)
      ),
      map((endereco) => {
        if ('cep' in endereco) {
          return endereco;
        }
        throw new CEPError(CEPErrorCode.CEP_NAO_ENCONTRADO);
      })
    );
  }

  /**
   * Faz a busca aproximada
   *
   * @param ufSigla
   * @param municipio
   * @param logradouro
   */
  buscarPorEndereco(
    ufSigla: string,
    municipio: string,
    logradouro: string
  ): Promise<Array<Endereco>> {
    return new Promise<Array<Endereco>>((resolve, reject) => {
      validateState(ufSigla);

      validateTown(municipio);

      validateStreet(logradouro);

      this.searchAddress(ufSigla, municipio, logradouro)
        .toPromise()
        .then((enderecos: Array<Endereco>) => {
          resolve(enderecos);
        })
        .catch(() => {
          reject(new CEPError(CEPErrorCode.ERRO_SERVIDOR));
        });
    });
  }

  private searchAddress(
    state: string,
    town: string,
    street: string
  ): Observable<Array<Endereco>> {
    const url = `${BASE_URL}/${state}/${town}/${street}/json`;

    return this.http.get<Array<Endereco>>(url);
  }
}
