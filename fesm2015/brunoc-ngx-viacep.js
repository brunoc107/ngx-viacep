import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const ErrorValues = {
    CEP_NAO_ENCONTRADO: 0,
    CEP_VAZIO: 1,
    CEP_INVALIDO: 2,
    CEP_MUITO_CURTO: 3,
    CEP_MUITO_LONGO: 4,
    UF_VAZIA: 5,
    UF_MUITO_CURTA: 6,
    UF_MUITO_LONGA: 7,
    UF_NAO_EXISTE: 8,
    MUNICIPIO_VAZIO: 9,
    MUNICIPIO_MUITO_CURTO: 10,
    LOGRADOURO_VAZIO: 11,
    LOGRADOURO_MUITO_CURTO: 12,
    ERRO_SERVIDOR: 13,
};
ErrorValues[ErrorValues.CEP_NAO_ENCONTRADO] = 'CEP_NAO_ENCONTRADO';
ErrorValues[ErrorValues.CEP_VAZIO] = 'CEP_VAZIO';
ErrorValues[ErrorValues.CEP_INVALIDO] = 'CEP_INVALIDO';
ErrorValues[ErrorValues.CEP_MUITO_CURTO] = 'CEP_MUITO_CURTO';
ErrorValues[ErrorValues.CEP_MUITO_LONGO] = 'CEP_MUITO_LONGO';
ErrorValues[ErrorValues.UF_VAZIA] = 'UF_VAZIA';
ErrorValues[ErrorValues.UF_MUITO_CURTA] = 'UF_MUITO_CURTA';
ErrorValues[ErrorValues.UF_MUITO_LONGA] = 'UF_MUITO_LONGA';
ErrorValues[ErrorValues.UF_NAO_EXISTE] = 'UF_NAO_EXISTE';
ErrorValues[ErrorValues.MUNICIPIO_VAZIO] = 'MUNICIPIO_VAZIO';
ErrorValues[ErrorValues.MUNICIPIO_MUITO_CURTO] = 'MUNICIPIO_MUITO_CURTO';
ErrorValues[ErrorValues.LOGRADOURO_VAZIO] = 'LOGRADOURO_VAZIO';
ErrorValues[ErrorValues.LOGRADOURO_MUITO_CURTO] = 'LOGRADOURO_MUITO_CURTO';
ErrorValues[ErrorValues.ERRO_SERVIDOR] = 'ERRO_SERVIDOR';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ErroCep extends Error {
    /**
     * @param {?} errorCode
     */
    constructor(errorCode) {
        super(ErrorValues[errorCode]);
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, ErroCep.prototype);
    }
    /**
     * Returns the Error code
     * @return {?}
     */
    getCode() {
        return this.errorCode;
    }
    /**
     * Compares the thrown error type with an ErrorValues enum item
     * @param {?} type
     * @return {?}
     */
    ofType(type) {
        return this.getCode() === type;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const BASE_URL = 'https://viacep.com.br/ws';
/** @type {?} */
const VALID_UFS = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
    'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
];
class NgxViacepService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    static throwCepError(error) {
        throw new ErroCep(error);
    }
    /**
     * @param {?} cep
     * @return {?}
     */
    static validateCep(cep) {
        /** @type {?} */
        const regex = new RegExp(/^[0-9]+$/);
        if (NgxViacepService.stringIsEmpty(cep)) {
            NgxViacepService.throwCepError(ErrorValues.CEP_VAZIO);
        }
        else if (!regex.test(cep)) {
            NgxViacepService.throwCepError(ErrorValues.CEP_INVALIDO);
        }
        else if (cep.length < 8) {
            NgxViacepService.throwCepError(ErrorValues.CEP_MUITO_CURTO);
        }
        else if (cep.length > 8) {
            NgxViacepService.throwCepError(ErrorValues.CEP_MUITO_LONGO);
        }
    }
    /**
     * @param {?} cep
     * @return {?}
     */
    static clearCep(cep) {
        /** @type {?} */
        const cepStr = `${cep}`;
        return cepStr.replace('.', '').replace('-', '');
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static stringIsEmpty(data) {
        return (data.trim() === '' ||
            data === null ||
            typeof data === 'undefined');
    }
    /**
     * @param {?} data
     * @param {?} minLength
     * @return {?}
     */
    static stringHasMinimumLength(data, minLength) {
        return data.trim().length >= minLength;
    }
    /**
     * @param {?} data
     * @param {?} maxLength
     * @return {?}
     */
    static stringHasMaximumLength(data, maxLength) {
        return data.trim().length <= maxLength;
    }
    /**
     * @param {?} uf
     * @return {?}
     */
    static ufExists(uf) {
        return VALID_UFS.indexOf(uf.toLocaleUpperCase()) > -1;
    }
    /**
     * @param {?} province
     * @return {?}
     */
    static validateState(province) {
        if (NgxViacepService.stringIsEmpty(province)) {
            NgxViacepService.throwCepError(ErrorValues.UF_VAZIA);
        }
        if (!NgxViacepService.stringHasMinimumLength(province, 2)) {
            NgxViacepService.throwCepError(ErrorValues.UF_MUITO_CURTA);
        }
        if (!NgxViacepService.stringHasMaximumLength(province, 2)) {
            NgxViacepService.throwCepError(ErrorValues.UF_MUITO_LONGA);
        }
        if (!NgxViacepService.ufExists(province)) {
            NgxViacepService.throwCepError(ErrorValues.UF_NAO_EXISTE);
        }
    }
    /**
     * @param {?} town
     * @return {?}
     */
    static validateTown(town) {
        if (NgxViacepService.stringIsEmpty(town)) {
            NgxViacepService.throwCepError(ErrorValues.MUNICIPIO_VAZIO);
        }
        if (!NgxViacepService.stringHasMinimumLength(town, 3)) {
            NgxViacepService.throwCepError(ErrorValues.MUNICIPIO_MUITO_CURTO);
        }
    }
    /**
     * @param {?} street
     * @return {?}
     */
    static validateStreet(street) {
        if (NgxViacepService.stringIsEmpty(street)) {
            NgxViacepService.throwCepError(ErrorValues.LOGRADOURO_VAZIO);
        }
        if (!NgxViacepService.stringHasMinimumLength(street, 3)) {
            NgxViacepService.throwCepError(ErrorValues.LOGRADOURO_MUITO_CURTO);
        }
    }
    /**
     * @param {?} cep
     * @return {?}
     */
    findByCep(cep) {
        /** @type {?} */
        const url = `${BASE_URL}/${cep}/json`;
        return this.http.get(url);
    }
    /**
     * @param {?} state
     * @param {?} town
     * @param {?} street
     * @return {?}
     */
    searchAddress(state, town, street) {
        /** @type {?} */
        const url = `${BASE_URL}/${state}/${town}/${street}/json`;
        return this.http.get(url);
    }
    /**
     * Busca o endereço a partir do CEP
     * @param {?} cep
     * @return {?}
     */
    buscarPorCep(cep) {
        return new Promise((resolve, reject) => {
            /** @type {?} */
            const cleanCep = NgxViacepService.clearCep(cep);
            NgxViacepService.validateCep(cleanCep);
            this.findByCep(cleanCep).toPromise().then((endereco) => {
                if ('cep' in endereco) {
                    resolve(endereco);
                }
                else {
                    reject(new ErroCep(ErrorValues.CEP_NAO_ENCONTRADO));
                }
            }).catch(() => {
                reject(new ErroCep(ErrorValues.ERRO_SERVIDOR));
            });
        });
    }
    /**
     * Faz a busca aproximada
     * @param {?} ufSigla
     * @param {?} municipio
     * @param {?} logradouro
     * @return {?}
     */
    buscarPorEndereco(ufSigla, municipio, logradouro) {
        return new Promise((resolve, reject) => {
            NgxViacepService.validateState(ufSigla);
            NgxViacepService.validateTown(municipio);
            NgxViacepService.validateStreet(logradouro);
            this.searchAddress(ufSigla, municipio, logradouro).toPromise().then((enderecos) => {
                resolve(enderecos);
            }).catch(() => {
                reject(new ErroCep(ErrorValues.ERRO_SERVIDOR));
            });
        });
    }
}
NgxViacepService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgxViacepService.ctorParameters = () => [
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxViacepModule {
}
NgxViacepModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    HttpClientModule
                ],
                declarations: [],
                exports: [],
                providers: [
                    NgxViacepService
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxViacepModule, NgxViacepService, ErrorValues, ErroCep };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJ1bm9jLW5neC12aWFjZXAuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BicnVub2Mvbmd4LXZpYWNlcC9saWIvbW9kZWwvZXJyb3ItdmFsdWVzLmVudW0udHMiLCJuZzovL0BicnVub2Mvbmd4LXZpYWNlcC9saWIvbW9kZWwvZXJyby1jZXAudHMiLCJuZzovL0BicnVub2Mvbmd4LXZpYWNlcC9saWIvbmd4LXZpYWNlcC5zZXJ2aWNlLnRzIiwibmc6Ly9AYnJ1bm9jL25neC12aWFjZXAvbGliL25neC12aWFjZXAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEVycm9yVmFsdWVzIHtcbiAgQ0VQX05BT19FTkNPTlRSQURPLFxuICBDRVBfVkFaSU8sXG4gIENFUF9JTlZBTElETyxcbiAgQ0VQX01VSVRPX0NVUlRPLFxuICBDRVBfTVVJVE9fTE9OR08sXG4gIFVGX1ZBWklBLFxuICBVRl9NVUlUT19DVVJUQSxcbiAgVUZfTVVJVE9fTE9OR0EsXG4gIFVGX05BT19FWElTVEUsXG4gIE1VTklDSVBJT19WQVpJTyxcbiAgTVVOSUNJUElPX01VSVRPX0NVUlRPLFxuICBMT0dSQURPVVJPX1ZBWklPLFxuICBMT0dSQURPVVJPX01VSVRPX0NVUlRPLFxuICBFUlJPX1NFUlZJRE9SXG59XG4iLCJpbXBvcnQge0Vycm9yVmFsdWVzfSBmcm9tICcuL2Vycm9yLXZhbHVlcy5lbnVtJztcblxuZXhwb3J0IGNsYXNzIEVycm9DZXAgZXh0ZW5kcyBFcnJvciB7XG5cbiAgY29uc3RydWN0b3IoIHByaXZhdGUgZXJyb3JDb2RlOiBFcnJvclZhbHVlcyApIHtcblxuICAgIHN1cGVyKEVycm9yVmFsdWVzW2Vycm9yQ29kZV0pO1xuXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEVycm9DZXAucHJvdG90eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBFcnJvciBjb2RlXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29kZSgpOiBFcnJvclZhbHVlcyB7XG4gICAgcmV0dXJuIHRoaXMuZXJyb3JDb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSB0aHJvd24gZXJyb3IgdHlwZSB3aXRoIGFuIEVycm9yVmFsdWVzIGVudW0gaXRlbVxuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgcHVibGljIG9mVHlwZSh0eXBlOiBFcnJvclZhbHVlcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldENvZGUoKSA9PT0gdHlwZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtFbmRlcmVjb30gZnJvbSAnLi9tb2RlbC9lbmRlcmVjbyc7XG5pbXBvcnQge0Vycm9DZXB9IGZyb20gJy4vbW9kZWwvZXJyby1jZXAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RXJyb3JWYWx1ZXN9IGZyb20gJy4vbW9kZWwvZXJyb3ItdmFsdWVzLmVudW0nO1xuXG5jb25zdCBCQVNFX1VSTCA9ICdodHRwczovL3ZpYWNlcC5jb20uYnIvd3MnO1xuXG5jb25zdCBWQUxJRF9VRlM6IHN0cmluZ1tdID0gW1xuICAnQUMnLCAnQUwnLCAnQU0nLCAnQVAnLCAnQkEnLCAnQ0UnLCAnREYnLCAnRVMnLCAnR08nLFxuICAnTUEnLCAnTUcnLCAnTVMnLCAnTVQnLCAnUEEnLCAnUEInLCAnUEUnLCAnUEknLCAnUFInLFxuICAnUkonLCAnUk4nLCAnUk8nLCAnUlInLCAnUlMnLCAnU0MnLCAnU0UnLCAnU1AnLCAnVE8nXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neFZpYWNlcFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICBwcml2YXRlIHN0YXRpYyB0aHJvd0NlcEVycm9yKGVycm9yOiBFcnJvclZhbHVlcykge1xuICAgIHRocm93IG5ldyBFcnJvQ2VwKGVycm9yKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlQ2VwKGNlcDogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoL15bMC05XSskLyk7XG4gICAgaWYgKE5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSXNFbXB0eShjZXApKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuQ0VQX1ZBWklPKTtcbiAgICB9IGVsc2UgaWYgKCFyZWdleC50ZXN0KGNlcCkpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfSU5WQUxJRE8pO1xuICAgIH0gZWxzZSBpZiAoY2VwLmxlbmd0aCA8IDgpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfTVVJVE9fQ1VSVE8pO1xuICAgIH0gZWxzZSBpZiAoY2VwLmxlbmd0aCA+IDgpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfTVVJVE9fTE9OR08pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNsZWFyQ2VwKGNlcDogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGNvbnN0IGNlcFN0ciA9IGAke2NlcH1gO1xuICAgIHJldHVybiBjZXBTdHIucmVwbGFjZSgnLicsICcnKS5yZXBsYWNlKCctJywgJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nSXNFbXB0eShkYXRhOiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgIHJldHVybiAoXG4gICAgICBkYXRhLnRyaW0oKSA9PT0gJycgfHxcbiAgICAgIGRhdGEgPT09IG51bGwgfHxcbiAgICAgIHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKGRhdGE6IHN0cmluZywgbWluTGVuZ3RoOiBudW1iZXIpOiBib29sZWFuIHtcblxuICAgIHJldHVybiBkYXRhLnRyaW0oKS5sZW5ndGggPj0gbWluTGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nSGFzTWF4aW11bUxlbmd0aChkYXRhOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICByZXR1cm4gZGF0YS50cmltKCkubGVuZ3RoIDw9IG1heExlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHVmRXhpc3RzKHVmOiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgIHJldHVybiBWQUxJRF9VRlMuaW5kZXhPZih1Zi50b0xvY2FsZVVwcGVyQ2FzZSgpKSA+IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVTdGF0ZShwcm92aW5jZTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAoTmd4VmlhY2VwU2VydmljZS5zdHJpbmdJc0VtcHR5KHByb3ZpbmNlKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLlVGX1ZBWklBKTtcbiAgICB9XG5cbiAgICBpZiAoIU5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSGFzTWluaW11bUxlbmd0aChwcm92aW5jZSwgMikpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5VRl9NVUlUT19DVVJUQSk7XG4gICAgfVxuXG4gICAgaWYgKCFOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0hhc01heGltdW1MZW5ndGgocHJvdmluY2UsIDIpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuVUZfTVVJVE9fTE9OR0EpO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS51ZkV4aXN0cyhwcm92aW5jZSkpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5VRl9OQU9fRVhJU1RFKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZVRvd24odG93bjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAoTmd4VmlhY2VwU2VydmljZS5zdHJpbmdJc0VtcHR5KHRvd24pKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuTVVOSUNJUElPX1ZBWklPKTtcbiAgICB9XG5cbiAgICBpZiAoIU5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSGFzTWluaW11bUxlbmd0aCh0b3duLCAzKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLk1VTklDSVBJT19NVUlUT19DVVJUTyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVTdHJlZXQoc3RyZWV0OiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmIChOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0lzRW1wdHkoc3RyZWV0KSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkxPR1JBRE9VUk9fVkFaSU8pO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS5zdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKHN0cmVldCwgMykpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5MT0dSQURPVVJPX01VSVRPX0NVUlRPKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRCeUNlcChjZXA6IHN0cmluZyk6IE9ic2VydmFibGU8RW5kZXJlY28+IHtcblxuICAgIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfS8ke2NlcH0vanNvbmA7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxFbmRlcmVjbz4odXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoQWRkcmVzcyhzdGF0ZTogc3RyaW5nLCB0b3duOiBzdHJpbmcsIHN0cmVldDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcnJheTxFbmRlcmVjbz4+IHtcblxuICAgIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfS8ke3N0YXRlfS8ke3Rvd259LyR7c3RyZWV0fS9qc29uYDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEFycmF5PEVuZGVyZWNvPj4odXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdXNjYSBvIGVuZGVyZcODwqdvIGEgcGFydGlyIGRvIENFUFxuICAgKiBAcGFyYW0gY2VwXG4gICAqL1xuICBidXNjYXJQb3JDZXAoY2VwOiBzdHJpbmcpOiBQcm9taXNlPEVuZGVyZWNvPiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8RW5kZXJlY28+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgY29uc3QgY2xlYW5DZXAgPSBOZ3hWaWFjZXBTZXJ2aWNlLmNsZWFyQ2VwKGNlcCk7XG5cbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudmFsaWRhdGVDZXAoY2xlYW5DZXApO1xuXG4gICAgICB0aGlzLmZpbmRCeUNlcChjbGVhbkNlcCkudG9Qcm9taXNlKCkudGhlbigoZW5kZXJlY286IEVuZGVyZWNvKSA9PiB7XG4gICAgICAgIGlmICggJ2NlcCcgaW4gZW5kZXJlY28gKSB7XG4gICAgICAgICAgcmVzb2x2ZShlbmRlcmVjbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvQ2VwKEVycm9yVmFsdWVzLkNFUF9OQU9fRU5DT05UUkFETykpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb0NlcChFcnJvclZhbHVlcy5FUlJPX1NFUlZJRE9SKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGYXogYSBidXNjYSBhcHJveGltYWRhXG4gICAqIEBwYXJhbSB1ZlNpZ2xhXG4gICAqIEBwYXJhbSBtdW5pY2lwaW9cbiAgICogQHBhcmFtIGxvZ3JhZG91cm9cbiAgICovXG4gIGJ1c2NhclBvckVuZGVyZWNvKHVmU2lnbGE6IHN0cmluZywgbXVuaWNpcGlvOiBzdHJpbmcsIGxvZ3JhZG91cm86IHN0cmluZyk6IFByb21pc2U8QXJyYXk8RW5kZXJlY28+PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8QXJyYXk8RW5kZXJlY28+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudmFsaWRhdGVTdGF0ZSh1ZlNpZ2xhKTtcblxuICAgICAgTmd4VmlhY2VwU2VydmljZS52YWxpZGF0ZVRvd24obXVuaWNpcGlvKTtcblxuICAgICAgTmd4VmlhY2VwU2VydmljZS52YWxpZGF0ZVN0cmVldChsb2dyYWRvdXJvKTtcblxuICAgICAgdGhpcy5zZWFyY2hBZGRyZXNzKHVmU2lnbGEsIG11bmljaXBpbywgbG9ncmFkb3VybykudG9Qcm9taXNlKCkudGhlbigoZW5kZXJlY29zOiBBcnJheTxFbmRlcmVjbz4pID0+IHtcbiAgICAgICAgcmVzb2x2ZShlbmRlcmVjb3MpO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZWplY3QobmV3IEVycm9DZXAoRXJyb3JWYWx1ZXMuRVJST19TRVJWSURPUikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hWaWFjZXBTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtdmlhY2VwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgZXhwb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIE5neFZpYWNlcFNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hWaWFjZXBNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBQ0UscUJBQWtCO0lBQ2xCLFlBQVM7SUFDVCxlQUFZO0lBQ1osa0JBQWU7SUFDZixrQkFBZTtJQUNmLFdBQVE7SUFDUixpQkFBYztJQUNkLGlCQUFjO0lBQ2QsZ0JBQWE7SUFDYixrQkFBZTtJQUNmLHlCQUFxQjtJQUNyQixvQkFBZ0I7SUFDaEIsMEJBQXNCO0lBQ3RCLGlCQUFhOzt3QkFiYixrQkFBa0I7d0JBQ2xCLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixzQkFBc0I7d0JBQ3RCLGFBQWE7Ozs7OztBQ2RmLGFBRXFCLFNBQVEsS0FBSzs7OztJQUVoQyxZQUFxQixTQUFzQjtRQUV6QyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFGWCxjQUFTLEdBQVQsU0FBUyxDQUFhO1FBSXpDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNoRDs7Ozs7SUFLTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7O0lBT2pCLE1BQU0sQ0FBQyxJQUFpQjtRQUM3QixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUM7O0NBRWxDOzs7Ozs7QUN6QkQ7QUFPQSxNQUFNLFFBQVEsR0FBRywwQkFBMEIsQ0FBQzs7QUFFNUMsTUFBTSxTQUFTLEdBQWE7SUFDMUIsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVB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