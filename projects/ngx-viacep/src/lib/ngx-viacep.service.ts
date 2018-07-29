import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endereco} from './model/endereco';
import {ErroCep} from './model/erro-cep';
import {Observable} from 'rxjs';

const BASE_URL = 'https://viacep.com.br/ws';

@Injectable()
export class NgxViacepService {

  constructor(private http: HttpClient) {
  }

  private static validateCep(cep: string): void {

    const regex = new RegExp(/^[0-9]+$/);
    if (NgxViacepService.stringIsEmpty(cep)) {
      throw new ErroCep('CEP_VAZIO');
    } else if (!regex.test(cep)) {
      throw new ErroCep('CEP_INVALIDO');
    } else if (cep.length < 8) {
      throw new ErroCep('CEP_MUITO_CURTO');
    } else if (cep.length > 8) {
      throw new ErroCep('CEP_MUITO_LONGO');
    }
  }

  private static clearCep(cep: string): string {

    return cep.replace('.', '').replace('-', '');
  }

  private static stringIsEmpty(data: string): boolean {

    return (
      data.trim() === '' ||
      data === null ||
      typeof data === 'undefined'
    );
  }

  private static stringHasMinimumLength(data: string, minLength: number): boolean {

    return data.trim().length >= minLength;
  }

  private findByCep(cep: string): Observable<Endereco> {

    const url = `${BASE_URL}/${cep}/json`;

    return this.http.get<Endereco>(url);
  }

  private searchAddress(province: string, town: string, street: string): Observable<Array<Endereco>> {

    const url = `${BASE_URL}/${province}/${town}/${street}/json`;

    return this.http.get<Array<Endereco>>(url);
  }

  /**
   * Busca o endereço a partir do CEP
   * @param cep
   */
  buscarPorCep(cep: string): Promise<Endereco> {

    return new Promise<Endereco>((resolve, reject) => {

      const cleanCep = NgxViacepService.clearCep(cep);

      NgxViacepService.validateCep(cleanCep);

      this.findByCep(cleanCep).toPromise().then((endereco: Endereco) => {
        if ( 'cep' in endereco && endereco ) {
          resolve(endereco);
        } else {
          reject(new ErroCep('CEP_NAO_ENCONTRADO'));
        }
      }).catch((error) => {
        reject(new ErroCep('ERRO_SERVIDOR'));
      });
    });
  }

  /**
   * Faz a busca aproximada
   * @param ufSigla
   * @param municipio
   * @param logradouro
   */
  buscarPorEndereco(ufSigla: string, municipio: string, logradouro: string): Promise<Array<Endereco>> {

    return new Promise<Array<Endereco>>((resolve, reject) => {

      if (NgxViacepService.stringIsEmpty(ufSigla)) {
        throw new ErroCep('ERRO_UF');
      }

      if (NgxViacepService.stringIsEmpty(municipio)) {
        throw new ErroCep('ERRO_MUNICIPIO');
      }

      if (!NgxViacepService.stringHasMinimumLength(municipio, 3)) {
        throw new ErroCep('ERRO_MUNICIPIO_MUITO_CURTO');
      }

      if (NgxViacepService.stringIsEmpty(logradouro)) {
        throw new ErroCep('ERRO_LOGRADOURO');
      }

      if (!NgxViacepService.stringHasMinimumLength(logradouro, 3)) {
        throw new ErroCep('ERRO_LOGRADOURO_MUITO_CURTO');
      }

      this.searchAddress(ufSigla, municipio, logradouro).toPromise().then((enderecos: Array<Endereco>) => {
        resolve(enderecos);
      }).catch((error) => {
        reject(new ErroCep('ERRO_SERVIDOR'));
      });
    });
  }

}
