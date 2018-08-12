import { HttpClient } from '@angular/common/http';
import { Endereco } from './model/endereco';
export declare class NgxViacepService {
    private http;
    constructor(http: HttpClient);
    private static throwCepError;
    private static validateCep;
    private static clearCep;
    private static stringIsEmpty;
    private static stringHasMinimumLength;
    private static stringHasMaximumLength;
    private static ufExists;
    private static validateState;
    private static validateTown;
    private static validateStreet;
    private findByCep;
    private searchAddress;
    /**
     * Busca o endereço a partir do CEP
     * @param cep
     */
    buscarPorCep(cep: string): Promise<Endereco>;
    /**
     * Faz a busca aproximada
     * @param ufSigla
     * @param municipio
     * @param logradouro
     */
    buscarPorEndereco(ufSigla: string, municipio: string, logradouro: string): Promise<Array<Endereco>>;
}
