import { ErrorValues } from './error-values.enum';
export declare class ErroCep extends Error {
    private errorCode;
    constructor(errorCode: ErrorValues);
    /**
     * Returns the Error code
     */
    getCode(): ErrorValues;
    /**
     * Compares the thrown error type with an ErrorValues enum item
     * @param type
     */
    ofType(type: ErrorValues): boolean;
}
