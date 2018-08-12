/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErroCep } from './model/erro-cep';
import { ErrorValues } from './model/error-values.enum';
/** @type {?} */
const BASE_URL = 'https://viacep.com.br/ws';
/** @type {?} */
const VALID_UFS = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
    'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
];
export class NgxViacepService {
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
if (false) {
    /** @type {?} */
    NgxViacepService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXZpYWNlcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGJydW5vYy9uZ3gtdmlhY2VwLyIsInNvdXJjZXMiOlsibGliL25neC12aWFjZXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFdEQsTUFBTSxRQUFRLEdBQUcsMEJBQTBCLENBQUM7O0FBRTVDLE1BQU0sU0FBUyxHQUFhO0lBQzFCLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUNwRCxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDcEQsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0NBQUMsQ0FBQztBQUd4RCxNQUFNOzs7O0lBRUosWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtLQUFJOzs7OztJQUVoQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQWtCO1FBQzdDLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUduQixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQVc7O1FBRXBDLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksZ0JB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UUFBUSxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDthQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7S0FDSjs7Ozs7Ozs7SUFRRCxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsU0FBaUIsRUFBRSxVQUFrQjtRQUV0RSxPQUFPLElBQUksT0FBTyxDQUFrQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUV0RCxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXpDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBMEIsRUFBRSxFQUFFO2dCQUNqRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKOzs7WUExSkYsVUFBVTs7OztZQWJILFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0VuZGVyZWNvfSBmcm9tICcuL21vZGVsL2VuZGVyZWNvJztcbmltcG9ydCB7RXJyb0NlcH0gZnJvbSAnLi9tb2RlbC9lcnJvLWNlcCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtFcnJvclZhbHVlc30gZnJvbSAnLi9tb2RlbC9lcnJvci12YWx1ZXMuZW51bSc7XG5cbmNvbnN0IEJBU0VfVVJMID0gJ2h0dHBzOi8vdmlhY2VwLmNvbS5ici93cyc7XG5cbmNvbnN0IFZBTElEX1VGUzogc3RyaW5nW10gPSBbXG4gICdBQycsICdBTCcsICdBTScsICdBUCcsICdCQScsICdDRScsICdERicsICdFUycsICdHTycsXG4gICdNQScsICdNRycsICdNUycsICdNVCcsICdQQScsICdQQicsICdQRScsICdQSScsICdQUicsXG4gICdSSicsICdSTicsICdSTycsICdSUicsICdSUycsICdTQycsICdTRScsICdTUCcsICdUTyddO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4VmlhY2VwU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIHByaXZhdGUgc3RhdGljIHRocm93Q2VwRXJyb3IoZXJyb3I6IEVycm9yVmFsdWVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9DZXAoZXJyb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVDZXAoY2VwOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgvXlswLTldKyQvKTtcbiAgICBpZiAoTmd4VmlhY2VwU2VydmljZS5zdHJpbmdJc0VtcHR5KGNlcCkpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfVkFaSU8pO1xuICAgIH0gZWxzZSBpZiAoIXJlZ2V4LnRlc3QoY2VwKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkNFUF9JTlZBTElETyk7XG4gICAgfSBlbHNlIGlmIChjZXAubGVuZ3RoIDwgOCkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkNFUF9NVUlUT19DVVJUTyk7XG4gICAgfSBlbHNlIGlmIChjZXAubGVuZ3RoID4gOCkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkNFUF9NVUlUT19MT05HTyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2xlYXJDZXAoY2VwOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgY29uc3QgY2VwU3RyID0gYCR7Y2VwfWA7XG4gICAgcmV0dXJuIGNlcFN0ci5yZXBsYWNlKCcuJywgJycpLnJlcGxhY2UoJy0nLCAnJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHJpbmdJc0VtcHR5KGRhdGE6IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGRhdGEudHJpbSgpID09PSAnJyB8fFxuICAgICAgZGF0YSA9PT0gbnVsbCB8fFxuICAgICAgdHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHN0cmluZ0hhc01pbmltdW1MZW5ndGgoZGF0YTogc3RyaW5nLCBtaW5MZW5ndGg6IG51bWJlcik6IGJvb2xlYW4ge1xuXG4gICAgcmV0dXJuIGRhdGEudHJpbSgpLmxlbmd0aCA+PSBtaW5MZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHJpbmdIYXNNYXhpbXVtTGVuZ3RoKGRhdGE6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIpOiBib29sZWFuIHtcblxuICAgIHJldHVybiBkYXRhLnRyaW0oKS5sZW5ndGggPD0gbWF4TGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdWZFeGlzdHModWY6IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gICAgcmV0dXJuIFZBTElEX1VGUy5pbmRleE9mKHVmLnRvTG9jYWxlVXBwZXJDYXNlKCkpID4gLTE7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZVN0YXRlKHByb3ZpbmNlOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmIChOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0lzRW1wdHkocHJvdmluY2UpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuVUZfVkFaSUEpO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS5zdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKHByb3ZpbmNlLCAyKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLlVGX01VSVRPX0NVUlRBKTtcbiAgICB9XG5cbiAgICBpZiAoIU5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSGFzTWF4aW11bUxlbmd0aChwcm92aW5jZSwgMikpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5VRl9NVUlUT19MT05HQSk7XG4gICAgfVxuXG4gICAgaWYgKCFOZ3hWaWFjZXBTZXJ2aWNlLnVmRXhpc3RzKHByb3ZpbmNlKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLlVGX05BT19FWElTVEUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlVG93bih0b3duOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmIChOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0lzRW1wdHkodG93bikpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5NVU5JQ0lQSU9fVkFaSU8pO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS5zdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKHRvd24sIDMpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuTVVOSUNJUElPX01VSVRPX0NVUlRPKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZVN0cmVldChzdHJlZXQ6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgaWYgKE5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSXNFbXB0eShzdHJlZXQpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuTE9HUkFET1VST19WQVpJTyk7XG4gICAgfVxuXG4gICAgaWYgKCFOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0hhc01pbmltdW1MZW5ndGgoc3RyZWV0LCAzKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkxPR1JBRE9VUk9fTVVJVE9fQ1VSVE8pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEJ5Q2VwKGNlcDogc3RyaW5nKTogT2JzZXJ2YWJsZTxFbmRlcmVjbz4ge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9LyR7Y2VwfS9qc29uYDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEVuZGVyZWNvPih1cmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hBZGRyZXNzKHN0YXRlOiBzdHJpbmcsIHRvd246IHN0cmluZywgc3RyZWV0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFycmF5PEVuZGVyZWNvPj4ge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9LyR7c3RhdGV9LyR7dG93bn0vJHtzdHJlZXR9L2pzb25gO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8RW5kZXJlY28+Pih1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1c2NhIG8gZW5kZXJlw6dvIGEgcGFydGlyIGRvIENFUFxuICAgKiBAcGFyYW0gY2VwXG4gICAqL1xuICBidXNjYXJQb3JDZXAoY2VwOiBzdHJpbmcpOiBQcm9taXNlPEVuZGVyZWNvPiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8RW5kZXJlY28+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgY29uc3QgY2xlYW5DZXAgPSBOZ3hWaWFjZXBTZXJ2aWNlLmNsZWFyQ2VwKGNlcCk7XG5cbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudmFsaWRhdGVDZXAoY2xlYW5DZXApO1xuXG4gICAgICB0aGlzLmZpbmRCeUNlcChjbGVhbkNlcCkudG9Qcm9taXNlKCkudGhlbigoZW5kZXJlY286IEVuZGVyZWNvKSA9PiB7XG4gICAgICAgIGlmICggJ2NlcCcgaW4gZW5kZXJlY28gKSB7XG4gICAgICAgICAgcmVzb2x2ZShlbmRlcmVjbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvQ2VwKEVycm9yVmFsdWVzLkNFUF9OQU9fRU5DT05UUkFETykpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb0NlcChFcnJvclZhbHVlcy5FUlJPX1NFUlZJRE9SKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGYXogYSBidXNjYSBhcHJveGltYWRhXG4gICAqIEBwYXJhbSB1ZlNpZ2xhXG4gICAqIEBwYXJhbSBtdW5pY2lwaW9cbiAgICogQHBhcmFtIGxvZ3JhZG91cm9cbiAgICovXG4gIGJ1c2NhclBvckVuZGVyZWNvKHVmU2lnbGE6IHN0cmluZywgbXVuaWNpcGlvOiBzdHJpbmcsIGxvZ3JhZG91cm86IHN0cmluZyk6IFByb21pc2U8QXJyYXk8RW5kZXJlY28+PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8QXJyYXk8RW5kZXJlY28+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudmFsaWRhdGVTdGF0ZSh1ZlNpZ2xhKTtcblxuICAgICAgTmd4VmlhY2VwU2VydmljZS52YWxpZGF0ZVRvd24obXVuaWNpcGlvKTtcblxuICAgICAgTmd4VmlhY2VwU2VydmljZS52YWxpZGF0ZVN0cmVldChsb2dyYWRvdXJvKTtcblxuICAgICAgdGhpcy5zZWFyY2hBZGRyZXNzKHVmU2lnbGEsIG11bmljaXBpbywgbG9ncmFkb3VybykudG9Qcm9taXNlKCkudGhlbigoZW5kZXJlY29zOiBBcnJheTxFbmRlcmVjbz4pID0+IHtcbiAgICAgICAgcmVzb2x2ZShlbmRlcmVjb3MpO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZWplY3QobmV3IEVycm9DZXAoRXJyb3JWYWx1ZXMuRVJST19TRVJWSURPUikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==