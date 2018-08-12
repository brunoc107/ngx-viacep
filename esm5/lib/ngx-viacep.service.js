/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErroCep } from './model/erro-cep';
import { ErrorValues } from './model/error-values.enum';
/** @type {?} */
var BASE_URL = 'https://viacep.com.br/ws';
/** @type {?} */
var VALID_UFS = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
    'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
];
var NgxViacepService = /** @class */ (function () {
    function NgxViacepService(http) {
        this.http = http;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    NgxViacepService.throwCepError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        throw new ErroCep(error);
    };
    /**
     * @param {?} cep
     * @return {?}
     */
    NgxViacepService.validateCep = /**
     * @param {?} cep
     * @return {?}
     */
    function (cep) {
        /** @type {?} */
        var regex = new RegExp(/^[0-9]+$/);
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
    };
    /**
     * @param {?} cep
     * @return {?}
     */
    NgxViacepService.clearCep = /**
     * @param {?} cep
     * @return {?}
     */
    function (cep) {
        /** @type {?} */
        var cepStr = "" + cep;
        return cepStr.replace('.', '').replace('-', '');
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgxViacepService.stringIsEmpty = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return (data.trim() === '' ||
            data === null ||
            typeof data === 'undefined');
    };
    /**
     * @param {?} data
     * @param {?} minLength
     * @return {?}
     */
    NgxViacepService.stringHasMinimumLength = /**
     * @param {?} data
     * @param {?} minLength
     * @return {?}
     */
    function (data, minLength) {
        return data.trim().length >= minLength;
    };
    /**
     * @param {?} data
     * @param {?} maxLength
     * @return {?}
     */
    NgxViacepService.stringHasMaximumLength = /**
     * @param {?} data
     * @param {?} maxLength
     * @return {?}
     */
    function (data, maxLength) {
        return data.trim().length <= maxLength;
    };
    /**
     * @param {?} uf
     * @return {?}
     */
    NgxViacepService.ufExists = /**
     * @param {?} uf
     * @return {?}
     */
    function (uf) {
        return VALID_UFS.indexOf(uf.toLocaleUpperCase()) > -1;
    };
    /**
     * @param {?} province
     * @return {?}
     */
    NgxViacepService.validateState = /**
     * @param {?} province
     * @return {?}
     */
    function (province) {
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
    };
    /**
     * @param {?} town
     * @return {?}
     */
    NgxViacepService.validateTown = /**
     * @param {?} town
     * @return {?}
     */
    function (town) {
        if (NgxViacepService.stringIsEmpty(town)) {
            NgxViacepService.throwCepError(ErrorValues.MUNICIPIO_VAZIO);
        }
        if (!NgxViacepService.stringHasMinimumLength(town, 3)) {
            NgxViacepService.throwCepError(ErrorValues.MUNICIPIO_MUITO_CURTO);
        }
    };
    /**
     * @param {?} street
     * @return {?}
     */
    NgxViacepService.validateStreet = /**
     * @param {?} street
     * @return {?}
     */
    function (street) {
        if (NgxViacepService.stringIsEmpty(street)) {
            NgxViacepService.throwCepError(ErrorValues.LOGRADOURO_VAZIO);
        }
        if (!NgxViacepService.stringHasMinimumLength(street, 3)) {
            NgxViacepService.throwCepError(ErrorValues.LOGRADOURO_MUITO_CURTO);
        }
    };
    /**
     * @param {?} cep
     * @return {?}
     */
    NgxViacepService.prototype.findByCep = /**
     * @param {?} cep
     * @return {?}
     */
    function (cep) {
        /** @type {?} */
        var url = BASE_URL + "/" + cep + "/json";
        return this.http.get(url);
    };
    /**
     * @param {?} state
     * @param {?} town
     * @param {?} street
     * @return {?}
     */
    NgxViacepService.prototype.searchAddress = /**
     * @param {?} state
     * @param {?} town
     * @param {?} street
     * @return {?}
     */
    function (state, town, street) {
        /** @type {?} */
        var url = BASE_URL + "/" + state + "/" + town + "/" + street + "/json";
        return this.http.get(url);
    };
    /**
     * Busca o endereço a partir do CEP
     * @param cep
     */
    /**
     * Busca o endereço a partir do CEP
     * @param {?} cep
     * @return {?}
     */
    NgxViacepService.prototype.buscarPorCep = /**
     * Busca o endereço a partir do CEP
     * @param {?} cep
     * @return {?}
     */
    function (cep) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var cleanCep = NgxViacepService.clearCep(cep);
            NgxViacepService.validateCep(cleanCep);
            _this.findByCep(cleanCep).toPromise().then(function (endereco) {
                if ('cep' in endereco) {
                    resolve(endereco);
                }
                else {
                    reject(new ErroCep(ErrorValues.CEP_NAO_ENCONTRADO));
                }
            }).catch(function () {
                reject(new ErroCep(ErrorValues.ERRO_SERVIDOR));
            });
        });
    };
    /**
     * Faz a busca aproximada
     * @param ufSigla
     * @param municipio
     * @param logradouro
     */
    /**
     * Faz a busca aproximada
     * @param {?} ufSigla
     * @param {?} municipio
     * @param {?} logradouro
     * @return {?}
     */
    NgxViacepService.prototype.buscarPorEndereco = /**
     * Faz a busca aproximada
     * @param {?} ufSigla
     * @param {?} municipio
     * @param {?} logradouro
     * @return {?}
     */
    function (ufSigla, municipio, logradouro) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            NgxViacepService.validateState(ufSigla);
            NgxViacepService.validateTown(municipio);
            NgxViacepService.validateStreet(logradouro);
            _this.searchAddress(ufSigla, municipio, logradouro).toPromise().then(function (enderecos) {
                resolve(enderecos);
            }).catch(function () {
                reject(new ErroCep(ErrorValues.ERRO_SERVIDOR));
            });
        });
    };
    NgxViacepService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgxViacepService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return NgxViacepService;
}());
export { NgxViacepService };
if (false) {
    /** @type {?} */
    NgxViacepService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXZpYWNlcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGJydW5vYy9uZ3gtdmlhY2VwLyIsInNvdXJjZXMiOlsibGliL25neC12aWFjZXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFdEQsSUFBTSxRQUFRLEdBQUcsMEJBQTBCLENBQUM7O0FBRTVDLElBQU0sU0FBUyxHQUFhO0lBQzFCLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUNwRCxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDcEQsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0NBQUMsQ0FBQzs7SUFLdEQsMEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7S0FBSTs7Ozs7SUFFekIsOEJBQWE7Ozs7Y0FBQyxLQUFrQjtRQUM3QyxNQUFNLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFHWiw0QkFBVzs7OztjQUFDLEdBQVc7O1FBRXBDLElBQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEdBQUcs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VyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztpQkFDckQ7YUFDRixDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7S0FDSjtJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILDRDQUFpQjs7Ozs7OztJQUFqQixVQUFrQixPQUFlLEVBQUUsU0FBaUIsRUFBRSxVQUFrQjtRQUF4RSxpQkFnQkM7UUFkQyxPQUFPLElBQUksT0FBTyxDQUFrQixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRWxELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV4QyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFekMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVDLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxTQUEwQjtnQkFDN0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3BCLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKOztnQkExSkYsVUFBVTs7OztnQkFiSCxVQUFVOzsyQkFEbEI7O1NBZWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtFbmRlcmVjb30gZnJvbSAnLi9tb2RlbC9lbmRlcmVjbyc7XG5pbXBvcnQge0Vycm9DZXB9IGZyb20gJy4vbW9kZWwvZXJyby1jZXAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RXJyb3JWYWx1ZXN9IGZyb20gJy4vbW9kZWwvZXJyb3ItdmFsdWVzLmVudW0nO1xuXG5jb25zdCBCQVNFX1VSTCA9ICdodHRwczovL3ZpYWNlcC5jb20uYnIvd3MnO1xuXG5jb25zdCBWQUxJRF9VRlM6IHN0cmluZ1tdID0gW1xuICAnQUMnLCAnQUwnLCAnQU0nLCAnQVAnLCAnQkEnLCAnQ0UnLCAnREYnLCAnRVMnLCAnR08nLFxuICAnTUEnLCAnTUcnLCAnTVMnLCAnTVQnLCAnUEEnLCAnUEInLCAnUEUnLCAnUEknLCAnUFInLFxuICAnUkonLCAnUk4nLCAnUk8nLCAnUlInLCAnUlMnLCAnU0MnLCAnU0UnLCAnU1AnLCAnVE8nXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neFZpYWNlcFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICBwcml2YXRlIHN0YXRpYyB0aHJvd0NlcEVycm9yKGVycm9yOiBFcnJvclZhbHVlcykge1xuICAgIHRocm93IG5ldyBFcnJvQ2VwKGVycm9yKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlQ2VwKGNlcDogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoL15bMC05XSskLyk7XG4gICAgaWYgKE5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSXNFbXB0eShjZXApKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuQ0VQX1ZBWklPKTtcbiAgICB9IGVsc2UgaWYgKCFyZWdleC50ZXN0KGNlcCkpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfSU5WQUxJRE8pO1xuICAgIH0gZWxzZSBpZiAoY2VwLmxlbmd0aCA8IDgpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfTVVJVE9fQ1VSVE8pO1xuICAgIH0gZWxzZSBpZiAoY2VwLmxlbmd0aCA+IDgpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfTVVJVE9fTE9OR08pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNsZWFyQ2VwKGNlcDogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGNvbnN0IGNlcFN0ciA9IGAke2NlcH1gO1xuICAgIHJldHVybiBjZXBTdHIucmVwbGFjZSgnLicsICcnKS5yZXBsYWNlKCctJywgJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nSXNFbXB0eShkYXRhOiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgIHJldHVybiAoXG4gICAgICBkYXRhLnRyaW0oKSA9PT0gJycgfHxcbiAgICAgIGRhdGEgPT09IG51bGwgfHxcbiAgICAgIHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKGRhdGE6IHN0cmluZywgbWluTGVuZ3RoOiBudW1iZXIpOiBib29sZWFuIHtcblxuICAgIHJldHVybiBkYXRhLnRyaW0oKS5sZW5ndGggPj0gbWluTGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nSGFzTWF4aW11bUxlbmd0aChkYXRhOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICByZXR1cm4gZGF0YS50cmltKCkubGVuZ3RoIDw9IG1heExlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHVmRXhpc3RzKHVmOiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgIHJldHVybiBWQUxJRF9VRlMuaW5kZXhPZih1Zi50b0xvY2FsZVVwcGVyQ2FzZSgpKSA+IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVTdGF0ZShwcm92aW5jZTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAoTmd4VmlhY2VwU2VydmljZS5zdHJpbmdJc0VtcHR5KHByb3ZpbmNlKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLlVGX1ZBWklBKTtcbiAgICB9XG5cbiAgICBpZiAoIU5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSGFzTWluaW11bUxlbmd0aChwcm92aW5jZSwgMikpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5VRl9NVUlUT19DVVJUQSk7XG4gICAgfVxuXG4gICAgaWYgKCFOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0hhc01heGltdW1MZW5ndGgocHJvdmluY2UsIDIpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuVUZfTVVJVE9fTE9OR0EpO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS51ZkV4aXN0cyhwcm92aW5jZSkpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5VRl9OQU9fRVhJU1RFKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZVRvd24odG93bjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAoTmd4VmlhY2VwU2VydmljZS5zdHJpbmdJc0VtcHR5KHRvd24pKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuTVVOSUNJUElPX1ZBWklPKTtcbiAgICB9XG5cbiAgICBpZiAoIU5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSGFzTWluaW11bUxlbmd0aCh0b3duLCAzKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLk1VTklDSVBJT19NVUlUT19DVVJUTyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVTdHJlZXQoc3RyZWV0OiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmIChOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0lzRW1wdHkoc3RyZWV0KSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkxPR1JBRE9VUk9fVkFaSU8pO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS5zdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKHN0cmVldCwgMykpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5MT0dSQURPVVJPX01VSVRPX0NVUlRPKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRCeUNlcChjZXA6IHN0cmluZyk6IE9ic2VydmFibGU8RW5kZXJlY28+IHtcblxuICAgIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfS8ke2NlcH0vanNvbmA7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxFbmRlcmVjbz4odXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoQWRkcmVzcyhzdGF0ZTogc3RyaW5nLCB0b3duOiBzdHJpbmcsIHN0cmVldDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcnJheTxFbmRlcmVjbz4+IHtcblxuICAgIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfS8ke3N0YXRlfS8ke3Rvd259LyR7c3RyZWV0fS9qc29uYDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEFycmF5PEVuZGVyZWNvPj4odXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdXNjYSBvIGVuZGVyZcOnbyBhIHBhcnRpciBkbyBDRVBcbiAgICogQHBhcmFtIGNlcFxuICAgKi9cbiAgYnVzY2FyUG9yQ2VwKGNlcDogc3RyaW5nKTogUHJvbWlzZTxFbmRlcmVjbz4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEVuZGVyZWNvPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGNvbnN0IGNsZWFuQ2VwID0gTmd4VmlhY2VwU2VydmljZS5jbGVhckNlcChjZXApO1xuXG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnZhbGlkYXRlQ2VwKGNsZWFuQ2VwKTtcblxuICAgICAgdGhpcy5maW5kQnlDZXAoY2xlYW5DZXApLnRvUHJvbWlzZSgpLnRoZW4oKGVuZGVyZWNvOiBFbmRlcmVjbykgPT4ge1xuICAgICAgICBpZiAoICdjZXAnIGluIGVuZGVyZWNvICkge1xuICAgICAgICAgIHJlc29sdmUoZW5kZXJlY28pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb0NlcChFcnJvclZhbHVlcy5DRVBfTkFPX0VOQ09OVFJBRE8pKTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZWplY3QobmV3IEVycm9DZXAoRXJyb3JWYWx1ZXMuRVJST19TRVJWSURPUikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmF6IGEgYnVzY2EgYXByb3hpbWFkYVxuICAgKiBAcGFyYW0gdWZTaWdsYVxuICAgKiBAcGFyYW0gbXVuaWNpcGlvXG4gICAqIEBwYXJhbSBsb2dyYWRvdXJvXG4gICAqL1xuICBidXNjYXJQb3JFbmRlcmVjbyh1ZlNpZ2xhOiBzdHJpbmcsIG11bmljaXBpbzogc3RyaW5nLCBsb2dyYWRvdXJvOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PEVuZGVyZWNvPj4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEFycmF5PEVuZGVyZWNvPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnZhbGlkYXRlU3RhdGUodWZTaWdsYSk7XG5cbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudmFsaWRhdGVUb3duKG11bmljaXBpbyk7XG5cbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudmFsaWRhdGVTdHJlZXQobG9ncmFkb3Vybyk7XG5cbiAgICAgIHRoaXMuc2VhcmNoQWRkcmVzcyh1ZlNpZ2xhLCBtdW5pY2lwaW8sIGxvZ3JhZG91cm8pLnRvUHJvbWlzZSgpLnRoZW4oKGVuZGVyZWNvczogQXJyYXk8RW5kZXJlY28+KSA9PiB7XG4gICAgICAgIHJlc29sdmUoZW5kZXJlY29zKTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvQ2VwKEVycm9yVmFsdWVzLkVSUk9fU0VSVklET1IpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=