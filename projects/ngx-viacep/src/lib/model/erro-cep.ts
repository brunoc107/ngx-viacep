import {ErrorValues} from './error-values.enum';

export class ErroCep extends Error {

  constructor( private errorCode: ErrorValues ) {

    super(ErrorValues[errorCode]);

    Object.setPrototypeOf(this, ErroCep.prototype);
  }

  /**
   * Returns the Error code
   */
  public getCode(): ErrorValues {
    return this.errorCode;
  }

  /**
   * Compares the thrown error type with an ErrorValues enum item
   *
   * @param type
   */
  public ofType(type: ErrorValues): boolean {
    return this.getCode() === type;
  }
}
