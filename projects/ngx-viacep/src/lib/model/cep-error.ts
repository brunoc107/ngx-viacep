import { CEPErrorCode } from './cep-error-code';

export class CEPError extends Error {
  constructor(private code: CEPErrorCode) {
    super();
    Object.setPrototypeOf(this, CEPError.prototype);
  }

  /**
   * Returns the Error code
   */
  getCode(): CEPErrorCode {
    return this.code;
  }

}
