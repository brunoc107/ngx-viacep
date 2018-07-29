import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from './model/endereco';
import { ErroCep } from './model/erro-cep';
import { Observable } from 'rxjs';

const BASE_URL = 'https://viacep.com.br/ws';

const VALID_UFS: string[] = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
  'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

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

    const cepStr = `${cep}`;
    return cepStr.replace('.', '').replace('-', '');
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

  private static stringHasMaximumLength(data: string, maxLength: number): boolean {

    return data.trim().length <= maxLength;
  }

  private static ufExists(uf: string): boolean {

    return VALID_UFS.indexOf(uf.toLocaleUpperCase()) > 0;
  }

  private static validateState(province: string): void {

    if (NgxViacepService.stringIsEmpty(province)) {
      throw new ErroCep('ERRO_UF');
    }

    if (!NgxViacepService.stringHasMinimumLength(province, 2)) {
      throw new ErroCep('ERRO_UF_MUITO_CURTA');
    }

    if (!NgxViacepService.stringHasMaximumLength(province, 2)) {
      throw new ErroCep('ERRO_UF_MUITO_LONGA');
    }

    if (!NgxViacepService.ufExists(province)) {
      throw new ErroCep('ERRO_UF_NAO_EXISTE');
    }
  }

  private static validateTown(town: string): void {

    if (NgxViacepService.stringIsEmpty(town)) {
      throw new ErroCep('ERRO_MUNICIPIO');
    }

    if (!NgxViacepService.stringHasMinimumLength(town, 3)) {
      throw new ErroCep('ERRO_MUNICIPIO_MUITO_CURTO');
    }
  }

  private static validateStreet(street: string): void {

    if (NgxViacepService.stringIsEmpty(street)) {
      throw new ErroCep('ERRO_LOGRADOURO');
    }

    if (!NgxViacepService.stringHasMinimumLength(street, 3)) {
      throw new ErroCep('ERRO_LOGRADOURO_MUITO_CURTO');
    }
  }

  private findByCep(cep: string): Observable<Endereco> {

    const url = `${BASE_URL}/${cep}/json`;

    return this.http.get<Endereco>(url);
  }

  private searchAddress(state: string, town: string, street: string): Observable<Array<Endereco>> {

    const url = `${BASE_URL}/${state}/${town}/${street}/json`;

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
        if ( 'cep' in endereco ) {
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

      NgxViacepService.validateState(ufSigla);

      NgxViacepService.validateTown(municipio);

      NgxViacepService.validateStreet(logradouro);

      this.searchAddress(ufSigla, municipio, logradouro).toPromise().then((enderecos: Array<Endereco>) => {
        resolve(enderecos);
      }).catch((error) => {
        reject(new ErroCep('ERRO_SERVIDOR'));
      });
    });
  }

}
