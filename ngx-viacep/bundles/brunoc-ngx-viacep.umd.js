(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@brunoc/ngx-viacep', ['exports', '@angular/core', '@angular/common/http'], factory) :
    (factory((global.brunoc = global.brunoc || {}, global.brunoc['ngx-viacep'] = {}),global.ng.core,global.ng.common.http));
}(this, (function (exports,core,http) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ErrorValues = {
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
    var ErroCep = /** @class */ (function (_super) {
        __extends(ErroCep, _super);
        function ErroCep(errorCode) {
            var _this = _super.call(this, ErrorValues[errorCode]) || this;
            _this.errorCode = errorCode;
            Object.setPrototypeOf(_this, ErroCep.prototype);
            return _this;
        }
        /**
         * Returns the Error code
         * @return {?}
         */
        ErroCep.prototype.getCode = /**
         * Returns the Error code
         * @return {?}
         */
            function () {
                return this.errorCode;
            };
        /**
         * Compares the thrown error type with an ErrorValues enum item
         * @param {?} type
         * @return {?}
         */
        ErroCep.prototype.ofType = /**
         * Compares the thrown error type with an ErrorValues enum item
         * @param {?} type
         * @return {?}
         */
            function (type) {
                return this.getCode() === type;
            };
        return ErroCep;
    }(Error));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var BASE_URL = 'https://viacep.com.br/ws';
    /** @type {?} */
    var VALID_UFS = [
        'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
        'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
        'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
    ];
    var NgxViacepService = /** @class */ (function () {
        function NgxViacepService(http$$1) {
            this.http = http$$1;
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgxViacepService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return NgxViacepService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxViacepModule = /** @class */ (function () {
        function NgxViacepModule() {
        }
        NgxViacepModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            http.HttpClientModule
                        ],
                        declarations: [],
                        exports: [],
                        providers: [
                            NgxViacepService
                        ]
                    },] },
        ];
        return NgxViacepModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgxViacepModule = NgxViacepModule;
    exports.NgxViacepService = NgxViacepService;
    exports.ErrorValues = ErrorValues;
    exports.ErroCep = ErroCep;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJ1bm9jLW5neC12aWFjZXAudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0BicnVub2Mvbmd4LXZpYWNlcC9saWIvbW9kZWwvZXJyb3ItdmFsdWVzLmVudW0udHMiLCJuZzovL0BicnVub2Mvbmd4LXZpYWNlcC9saWIvbW9kZWwvZXJyby1jZXAudHMiLCJuZzovL0BicnVub2Mvbmd4LXZpYWNlcC9saWIvbmd4LXZpYWNlcC5zZXJ2aWNlLnRzIiwibmc6Ly9AYnJ1bm9jL25neC12aWFjZXAvbGliL25neC12aWFjZXAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gRXJyb3JWYWx1ZXMge1xuICBDRVBfTkFPX0VOQ09OVFJBRE8sXG4gIENFUF9WQVpJTyxcbiAgQ0VQX0lOVkFMSURPLFxuICBDRVBfTVVJVE9fQ1VSVE8sXG4gIENFUF9NVUlUT19MT05HTyxcbiAgVUZfVkFaSUEsXG4gIFVGX01VSVRPX0NVUlRBLFxuICBVRl9NVUlUT19MT05HQSxcbiAgVUZfTkFPX0VYSVNURSxcbiAgTVVOSUNJUElPX1ZBWklPLFxuICBNVU5JQ0lQSU9fTVVJVE9fQ1VSVE8sXG4gIExPR1JBRE9VUk9fVkFaSU8sXG4gIExPR1JBRE9VUk9fTVVJVE9fQ1VSVE8sXG4gIEVSUk9fU0VSVklET1Jcbn1cbiIsImltcG9ydCB7RXJyb3JWYWx1ZXN9IGZyb20gJy4vZXJyb3ItdmFsdWVzLmVudW0nO1xuXG5leHBvcnQgY2xhc3MgRXJyb0NlcCBleHRlbmRzIEVycm9yIHtcblxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBlcnJvckNvZGU6IEVycm9yVmFsdWVzICkge1xuXG4gICAgc3VwZXIoRXJyb3JWYWx1ZXNbZXJyb3JDb2RlXSk7XG5cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgRXJyb0NlcC5wcm90b3R5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIEVycm9yIGNvZGVcbiAgICovXG4gIHB1YmxpYyBnZXRDb2RlKCk6IEVycm9yVmFsdWVzIHtcbiAgICByZXR1cm4gdGhpcy5lcnJvckNvZGU7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdGhlIHRocm93biBlcnJvciB0eXBlIHdpdGggYW4gRXJyb3JWYWx1ZXMgZW51bSBpdGVtXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqL1xuICBwdWJsaWMgb2ZUeXBlKHR5cGU6IEVycm9yVmFsdWVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29kZSgpID09PSB0eXBlO1xuICB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0VuZGVyZWNvfSBmcm9tICcuL21vZGVsL2VuZGVyZWNvJztcbmltcG9ydCB7RXJyb0NlcH0gZnJvbSAnLi9tb2RlbC9lcnJvLWNlcCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtFcnJvclZhbHVlc30gZnJvbSAnLi9tb2RlbC9lcnJvci12YWx1ZXMuZW51bSc7XG5cbmNvbnN0IEJBU0VfVVJMID0gJ2h0dHBzOi8vdmlhY2VwLmNvbS5ici93cyc7XG5cbmNvbnN0IFZBTElEX1VGUzogc3RyaW5nW10gPSBbXG4gICdBQycsICdBTCcsICdBTScsICdBUCcsICdCQScsICdDRScsICdERicsICdFUycsICdHTycsXG4gICdNQScsICdNRycsICdNUycsICdNVCcsICdQQScsICdQQicsICdQRScsICdQSScsICdQUicsXG4gICdSSicsICdSTicsICdSTycsICdSUicsICdSUycsICdTQycsICdTRScsICdTUCcsICdUTyddO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4VmlhY2VwU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIHByaXZhdGUgc3RhdGljIHRocm93Q2VwRXJyb3IoZXJyb3I6IEVycm9yVmFsdWVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9DZXAoZXJyb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVDZXAoY2VwOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgvXlswLTldKyQvKTtcbiAgICBpZiAoTmd4VmlhY2VwU2VydmljZS5zdHJpbmdJc0VtcHR5KGNlcCkpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5DRVBfVkFaSU8pO1xuICAgIH0gZWxzZSBpZiAoIXJlZ2V4LnRlc3QoY2VwKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkNFUF9JTlZBTElETyk7XG4gICAgfSBlbHNlIGlmIChjZXAubGVuZ3RoIDwgOCkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkNFUF9NVUlUT19DVVJUTyk7XG4gICAgfSBlbHNlIGlmIChjZXAubGVuZ3RoID4gOCkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkNFUF9NVUlUT19MT05HTyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2xlYXJDZXAoY2VwOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgY29uc3QgY2VwU3RyID0gYCR7Y2VwfWA7XG4gICAgcmV0dXJuIGNlcFN0ci5yZXBsYWNlKCcuJywgJycpLnJlcGxhY2UoJy0nLCAnJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHJpbmdJc0VtcHR5KGRhdGE6IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGRhdGEudHJpbSgpID09PSAnJyB8fFxuICAgICAgZGF0YSA9PT0gbnVsbCB8fFxuICAgICAgdHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHN0cmluZ0hhc01pbmltdW1MZW5ndGgoZGF0YTogc3RyaW5nLCBtaW5MZW5ndGg6IG51bWJlcik6IGJvb2xlYW4ge1xuXG4gICAgcmV0dXJuIGRhdGEudHJpbSgpLmxlbmd0aCA+PSBtaW5MZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHJpbmdIYXNNYXhpbXVtTGVuZ3RoKGRhdGE6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIpOiBib29sZWFuIHtcblxuICAgIHJldHVybiBkYXRhLnRyaW0oKS5sZW5ndGggPD0gbWF4TGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdWZFeGlzdHModWY6IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gICAgcmV0dXJuIFZBTElEX1VGUy5pbmRleE9mKHVmLnRvTG9jYWxlVXBwZXJDYXNlKCkpID4gLTE7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZVN0YXRlKHByb3ZpbmNlOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmIChOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0lzRW1wdHkocHJvdmluY2UpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuVUZfVkFaSUEpO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS5zdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKHByb3ZpbmNlLCAyKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLlVGX01VSVRPX0NVUlRBKTtcbiAgICB9XG5cbiAgICBpZiAoIU5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSGFzTWF4aW11bUxlbmd0aChwcm92aW5jZSwgMikpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5VRl9NVUlUT19MT05HQSk7XG4gICAgfVxuXG4gICAgaWYgKCFOZ3hWaWFjZXBTZXJ2aWNlLnVmRXhpc3RzKHByb3ZpbmNlKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLlVGX05BT19FWElTVEUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlVG93bih0b3duOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmIChOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0lzRW1wdHkodG93bikpIHtcbiAgICAgIE5neFZpYWNlcFNlcnZpY2UudGhyb3dDZXBFcnJvcihFcnJvclZhbHVlcy5NVU5JQ0lQSU9fVkFaSU8pO1xuICAgIH1cblxuICAgIGlmICghTmd4VmlhY2VwU2VydmljZS5zdHJpbmdIYXNNaW5pbXVtTGVuZ3RoKHRvd24sIDMpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuTVVOSUNJUElPX01VSVRPX0NVUlRPKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZVN0cmVldChzdHJlZXQ6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgaWYgKE5neFZpYWNlcFNlcnZpY2Uuc3RyaW5nSXNFbXB0eShzdHJlZXQpKSB7XG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnRocm93Q2VwRXJyb3IoRXJyb3JWYWx1ZXMuTE9HUkFET1VST19WQVpJTyk7XG4gICAgfVxuXG4gICAgaWYgKCFOZ3hWaWFjZXBTZXJ2aWNlLnN0cmluZ0hhc01pbmltdW1MZW5ndGgoc3RyZWV0LCAzKSkge1xuICAgICAgTmd4VmlhY2VwU2VydmljZS50aHJvd0NlcEVycm9yKEVycm9yVmFsdWVzLkxPR1JBRE9VUk9fTVVJVE9fQ1VSVE8pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEJ5Q2VwKGNlcDogc3RyaW5nKTogT2JzZXJ2YWJsZTxFbmRlcmVjbz4ge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9LyR7Y2VwfS9qc29uYDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEVuZGVyZWNvPih1cmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hBZGRyZXNzKHN0YXRlOiBzdHJpbmcsIHRvd246IHN0cmluZywgc3RyZWV0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFycmF5PEVuZGVyZWNvPj4ge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9LyR7c3RhdGV9LyR7dG93bn0vJHtzdHJlZXR9L2pzb25gO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8RW5kZXJlY28+Pih1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1c2NhIG8gZW5kZXJlw4PCp28gYSBwYXJ0aXIgZG8gQ0VQXG4gICAqIEBwYXJhbSBjZXBcbiAgICovXG4gIGJ1c2NhclBvckNlcChjZXA6IHN0cmluZyk6IFByb21pc2U8RW5kZXJlY28+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxFbmRlcmVjbz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBjb25zdCBjbGVhbkNlcCA9IE5neFZpYWNlcFNlcnZpY2UuY2xlYXJDZXAoY2VwKTtcblxuICAgICAgTmd4VmlhY2VwU2VydmljZS52YWxpZGF0ZUNlcChjbGVhbkNlcCk7XG5cbiAgICAgIHRoaXMuZmluZEJ5Q2VwKGNsZWFuQ2VwKS50b1Byb21pc2UoKS50aGVuKChlbmRlcmVjbzogRW5kZXJlY28pID0+IHtcbiAgICAgICAgaWYgKCAnY2VwJyBpbiBlbmRlcmVjbyApIHtcbiAgICAgICAgICByZXNvbHZlKGVuZGVyZWNvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9DZXAoRXJyb3JWYWx1ZXMuQ0VQX05BT19FTkNPTlRSQURPKSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvQ2VwKEVycm9yVmFsdWVzLkVSUk9fU0VSVklET1IpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZheiBhIGJ1c2NhIGFwcm94aW1hZGFcbiAgICogQHBhcmFtIHVmU2lnbGFcbiAgICogQHBhcmFtIG11bmljaXBpb1xuICAgKiBAcGFyYW0gbG9ncmFkb3Vyb1xuICAgKi9cbiAgYnVzY2FyUG9yRW5kZXJlY28odWZTaWdsYTogc3RyaW5nLCBtdW5pY2lwaW86IHN0cmluZywgbG9ncmFkb3Vybzogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxFbmRlcmVjbz4+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxBcnJheTxFbmRlcmVjbz4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgTmd4VmlhY2VwU2VydmljZS52YWxpZGF0ZVN0YXRlKHVmU2lnbGEpO1xuXG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnZhbGlkYXRlVG93bihtdW5pY2lwaW8pO1xuXG4gICAgICBOZ3hWaWFjZXBTZXJ2aWNlLnZhbGlkYXRlU3RyZWV0KGxvZ3JhZG91cm8pO1xuXG4gICAgICB0aGlzLnNlYXJjaEFkZHJlc3ModWZTaWdsYSwgbXVuaWNpcGlvLCBsb2dyYWRvdXJvKS50b1Byb21pc2UoKS50aGVuKChlbmRlcmVjb3M6IEFycmF5PEVuZGVyZWNvPikgPT4ge1xuICAgICAgICByZXNvbHZlKGVuZGVyZWNvcyk7XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb0NlcChFcnJvclZhbHVlcy5FUlJPX1NFUlZJRE9SKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFZpYWNlcFNlcnZpY2UgfSBmcm9tICcuL25neC12aWFjZXAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTmd4VmlhY2VwU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFZpYWNlcE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsImh0dHAiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIk5nTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FB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