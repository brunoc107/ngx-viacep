import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Endereco, CepError } from './endereco';

@Injectable()
export class ViacepService {

  private serviceUrl = 'https://viacep.com.br/ws';

  constructor( private http: HttpClient) { }

  /**
   * Limpar cep, deixando apenas os números
   * @param cep
   */
  limparCep( cep: string ) {
    return cep.replace('-', '').replace('.', '').trim();
  }

  /**
   * Busca um endereço pelo CEP
   * @param cep
   */
  buscarPorCep( cep: string ): Promise<Endereco|CepError> {

    const cleanCep = this.limparCep( cep );

    if ( cleanCep.length !== 8 ) {

      return this.customError('CEP_INVALIDO');
    }

    const uri = encodeURI(`${this.serviceUrl}/${cleanCep}/json`);

    return this.http.get<Endereco>(uri).toPromise().catch(( error ) => {

      return this.customError('ERRO_SERVIDOR');
    });
  }

  /**
   * Busca endereços pela UF, municipio e parte do nome do logradouro
   * @param ufSigla
   * @param municipio
   * @param busca
   */
  buscarPorEndereco( ufSigla: string, municipio: string, logradouro: string ): Promise<Endereco[] | CepError> {

    const uri = encodeURI(`${this.serviceUrl}/${ufSigla}/${municipio}/${logradouro}/json`);

    return this.http.get<Endereco[]>(uri).toPromise().catch(( error ) => {

      return this.customError('ERRO_SERVIDOR');
    });
  }

  /**
   * Retorna uma promessa de erro
   * @param type
   */
  protected customError( type: string ): Promise<CepError> {

    return new Promise<CepError>(( resolve, reject ) => {

      reject({error: true, descricao: type });
    });
  }
}
