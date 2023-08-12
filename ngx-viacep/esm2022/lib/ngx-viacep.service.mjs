import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CEPErrorCode } from './model/cep-error-code';
import { CEPError } from './model/cep-error';
import { BASE_URL } from './model/constantes';
import { validarCEP, validarEndereco } from './utils';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class NgxViacepService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXZpYWNlcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYnJ1bm9jL25neC12aWFjZXAvc3JjL2xpYi9uZ3gtdmlhY2VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUtoRCxNQUFNLE9BQU8sZ0JBQWdCO0lBQ1A7SUFBcEIsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFHLENBQUM7SUFFeEM7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDakIsVUFBVSxFQUFFLEVBQ1osU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVcsR0FBRyxRQUFRLElBQUksU0FBUyxPQUFPLENBQUMsQ0FDekQsRUFDRCxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNmLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBRTtnQkFDckIsT0FBTyxRQUFRLENBQUM7YUFDakI7WUFDRCxNQUFNLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsaUJBQWlCLENBQ2YsRUFBVSxFQUNWLFNBQWlCLEVBQ2pCLFVBQWtCO1FBRWxCLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDM0MsZUFBZSxFQUFFLEVBQ2pCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FDYixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDWCxHQUFHLFFBQVEsSUFBSSxFQUFFLElBQUksU0FBUyxJQUFJLFVBQVUsT0FBTyxDQUNwRCxDQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7MEVBM0NVLGdCQUFnQjtnRUFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFGZixNQUFNOzt1RkFFUCxnQkFBZ0I7Y0FINUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBFbmRlcmVjbyB9IGZyb20gJy4vbW9kZWwvZW5kZXJlY28nO1xuaW1wb3J0IHsgQ0VQRXJyb3JDb2RlIH0gZnJvbSAnLi9tb2RlbC9jZXAtZXJyb3ItY29kZSc7XG5pbXBvcnQgeyBDRVBFcnJvciB9IGZyb20gJy4vbW9kZWwvY2VwLWVycm9yJztcbmltcG9ydCB7IEJBU0VfVVJMIH0gZnJvbSAnLi9tb2RlbC9jb25zdGFudGVzJztcbmltcG9ydCB7IHZhbGlkYXJDRVAsIHZhbGlkYXJFbmRlcmVjbyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hWaWFjZXBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIC8qKlxuICAgKiBCdXNjYSBvIGVuZGVyZcOnbyBhIHBhcnRpciBkbyBDRVBcbiAgICpcbiAgICogQHBhcmFtIGNlcFxuICAgKi9cbiAgYnVzY2FyUG9yQ2VwKGNlcDogc3RyaW5nKTogT2JzZXJ2YWJsZTxFbmRlcmVjbz4ge1xuICAgIHJldHVybiBvZihjZXApLnBpcGUoXG4gICAgICB2YWxpZGFyQ0VQKCksXG4gICAgICBzd2l0Y2hNYXAoKGNlcFZhbGlkbykgPT5cbiAgICAgICAgdGhpcy5odHRwLmdldDxFbmRlcmVjbz4oYCR7QkFTRV9VUkx9LyR7Y2VwVmFsaWRvfS9qc29uYClcbiAgICAgICksXG4gICAgICBtYXAoKGVuZGVyZWNvKSA9PiB7XG4gICAgICAgIGlmICgnY2VwJyBpbiBlbmRlcmVjbykge1xuICAgICAgICAgIHJldHVybiBlbmRlcmVjbztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgQ0VQRXJyb3IoQ0VQRXJyb3JDb2RlLkNFUF9OQU9fRU5DT05UUkFETyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRmF6IGEgYnVzY2EgYXByb3hpbWFkYVxuICAgKlxuICAgKiBAcGFyYW0gdWZcbiAgICogQHBhcmFtIG11bmljaXBpb1xuICAgKiBAcGFyYW0gbG9ncmFkb3Vyb1xuICAgKi9cbiAgYnVzY2FyUG9yRW5kZXJlY28oXG4gICAgdWY6IHN0cmluZyxcbiAgICBtdW5pY2lwaW86IHN0cmluZyxcbiAgICBsb2dyYWRvdXJvOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbmRlcmVjb1tdPiB7XG4gICAgcmV0dXJuIG9mKHsgdWYsIG11bmljaXBpbywgbG9ncmFkb3VybyB9KS5waXBlKFxuICAgICAgdmFsaWRhckVuZGVyZWNvKCksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgdGhpcy5odHRwLmdldDxFbmRlcmVjb1tdPihcbiAgICAgICAgICBgJHtCQVNFX1VSTH0vJHt1Zn0vJHttdW5pY2lwaW99LyR7bG9ncmFkb3Vyb30vanNvbmBcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==