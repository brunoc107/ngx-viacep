import {ErrorValues} from './error-values.enum';

export class ErroCep extends Error {

  constructor( private errorCode: ErrorValues ) {

    super(ErrorValues[errorCode]);
  }

  /**
   * Returns the Error code
   */
  getCode(): ErrorValues {
    return this.errorCode;
  }

  /**
   * Compares the thrown error type with an ErrorValues enum item
   * @param type
   */
  ofType(type: ErrorValues): boolean {
    return this.getCode() === type;
  }
}
