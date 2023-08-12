import * as i1 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as i0 from '@angular/core';
import { NgModule, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

class NgxViacepModule {
    static ɵfac = function NgxViacepModule_Factory(t) { return new (t || NgxViacepModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxViacepModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [HttpClientModule] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxViacepModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [
                    HttpClientModule
                ],
                exports: []
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxViacepModule, { imports: [HttpClientModule] }); })();

// eslint-disable-next-line no-shadow
var CEPErrorCode;
(function (CEPErrorCode) {
    CEPErrorCode[CEPErrorCode["CEP_NAO_ENCONTRADO"] = 0] = "CEP_NAO_ENCONTRADO";
    CEPErrorCode[CEPErrorCode["CEP_VAZIO"] = 1] = "CEP_VAZIO";
    CEPErrorCode[CEPErrorCode["CEP_INVALIDO"] = 2] = "CEP_INVALIDO";
    CEPErrorCode[CEPErrorCode["CEP_MUITO_CURTO"] = 3] = "CEP_MUITO_CURTO";
    CEPErrorCode[CEPErrorCode["CEP_MUITO_LONGO"] = 4] = "CEP_MUITO_LONGO";
    CEPErrorCode[CEPErrorCode["UF_VAZIA"] = 5] = "UF_VAZIA";
    CEPErrorCode[CEPErrorCode["UF_MUITO_CURTA"] = 6] = "UF_MUITO_CURTA";
    CEPErrorCode[CEPErrorCode["UF_MUITO_LONGA"] = 7] = "UF_MUITO_LONGA";
    CEPErrorCode[CEPErrorCode["UF_NAO_EXISTE"] = 8] = "UF_NAO_EXISTE";
    CEPErrorCode[CEPErrorCode["MUNICIPIO_VAZIO"] = 9] = "MUNICIPIO_VAZIO";
    CEPErrorCode[CEPErrorCode["MUNICIPIO_MUITO_CURTO"] = 10] = "MUNICIPIO_MUITO_CURTO";
    CEPErrorCode[CEPErrorCode["LOGRADOURO_VAZIO"] = 11] = "LOGRADOURO_VAZIO";
    CEPErrorCode[CEPErrorCode["LOGRADOURO_MUITO_CURTO"] = 12] = "LOGRADOURO_MUITO_CURTO";
    CEPErrorCode[CEPErrorCode["ERRO_SERVIDOR"] = 13] = "ERRO_SERVIDOR";
})(CEPErrorCode || (CEPErrorCode = {}));

class CEPError extends Error {
    code;
    constructor(code) {
        super(CEPErrorCode[code]);
        this.code = code;
        Object.setPrototypeOf(this, CEPError.prototype);
    }
    /**
     * Returns the Error code
     */
    getCode() {
        return this.code;
    }
}

const BASE_URL = 'https://viacep.com.br/ws';
const UFS_VALIDAS = [
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO',
];

const throwCepError = (error) => {
    throw new CEPError(error);
};
const ehStringValida = (data) => !!data && data.trim() !== '';
const hasMinLength = (data, minLength) => data.trim().length >= minLength;
const hasMaxLength = (data, maxLength) => data.trim().length <= maxLength;
const validarMunicipio = (municipio) => {
    if (!ehStringValida(municipio)) {
        throwCepError(CEPErrorCode.MUNICIPIO_VAZIO);
    }
    if (!hasMinLength(municipio, 3)) {
        throwCepError(CEPErrorCode.MUNICIPIO_MUITO_CURTO);
    }
};
const validarLogradouro = (logradouro) => {
    if (!ehStringValida(logradouro)) {
        throwCepError(CEPErrorCode.LOGRADOURO_VAZIO);
    }
    if (!hasMinLength(logradouro, 3)) {
        throwCepError(CEPErrorCode.LOGRADOURO_MUITO_CURTO);
    }
};
const validarUF = (uf) => {
    if (!ehStringValida(uf)) {
        throwCepError(CEPErrorCode.UF_VAZIA);
    }
    if (!hasMinLength(uf, 2)) {
        throwCepError(CEPErrorCode.UF_MUITO_CURTA);
    }
    if (!hasMaxLength(uf, 2)) {
        throwCepError(CEPErrorCode.UF_MUITO_LONGA);
    }
    if (!UFS_VALIDAS.some((it) => it.toLowerCase() === uf.toLowerCase())) {
        throwCepError(CEPErrorCode.UF_NAO_EXISTE);
    }
};
const validarCEP = () => (source) => new Observable((subscriber) => source.subscribe({
    next: (cep) => {
        try {
            const regex = new RegExp(/^[0-9]+$/);
            if (!ehStringValida(cep)) {
                throwCepError(CEPErrorCode.CEP_VAZIO);
            }
            if (!regex.test(cep)) {
                throwCepError(CEPErrorCode.CEP_INVALIDO);
            }
            if (cep.length < 8) {
                throwCepError(CEPErrorCode.CEP_MUITO_CURTO);
            }
            if (cep.length > 8) {
                throwCepError(CEPErrorCode.CEP_MUITO_LONGO);
            }
            subscriber.next(cep.trim());
        }
        catch (e) {
            subscriber.error(e);
        }
    },
    error: (error) => subscriber.error(error),
    complete: () => subscriber.complete(),
}));
const validarEndereco = () => (source) => new Observable((subscriber) => source.subscribe({
    next: ({ uf, logradouro, municipio }) => {
        try {
            validarUF(uf);
            validarMunicipio(municipio);
            validarLogradouro(logradouro);
        }
        catch (e) {
            subscriber.error(e);
        }
        subscriber.next({ uf, logradouro, municipio });
    },
    error: (error) => subscriber.error(error),
    complete: () => subscriber.complete(),
}));

class NgxViacepService {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * Busca o endereço a partir do CEP
     *
     * @param cep
     */
    buscarPorCep(cep) {
        return of(cep).pipe(validarCEP(), switchMap((cepValido) => this.http.get(`${BASE_URL}/${cepValido}/json`)), map((endereco) => {
            if ('cep' in endereco) {
                return endereco;
            }
            throw new CEPError(CEPErrorCode.CEP_NAO_ENCONTRADO);
        }));
    }
    /**
     * Faz a busca aproximada
     *
     * @param uf
     * @param municipio
     * @param logradouro
     */
    buscarPorEndereco(uf, municipio, logradouro) {
        return of({ uf, municipio, logradouro }).pipe(validarEndereco(), switchMap(() => this.http.get(`${BASE_URL}/${uf}/${municipio}/${logradouro}/json`)));
    }
    static ɵfac = function NgxViacepService_Factory(t) { return new (t || NgxViacepService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NgxViacepService, factory: NgxViacepService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxViacepService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();

/*
 * Public API Surface of ngx-viacep
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CEPError, CEPErrorCode, NgxViacepModule, NgxViacepService };
//# sourceMappingURL=brunoc-ngx-viacep.mjs.map
