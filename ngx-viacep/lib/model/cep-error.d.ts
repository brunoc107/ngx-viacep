import { CEPErrorCode } from './cep-error-code';
export declare class CEPError extends Error {
    private code;
    constructor(code: CEPErrorCode);
    /**
     * Returns the Error code
     */
    getCode(): CEPErrorCode;
}
//# sourceMappingURL=cep-error.d.ts.map