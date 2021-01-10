import { CEPError } from '@models/cep-error';
import { CEPErrorCode } from '@models/cep-error-code';
import { VALID_UFS } from '@models/constantes';
import { Observable } from 'rxjs';

const throwCepError = (error: CEPErrorCode) => {
  throw new CEPError(error);
};

const ehStringValida = (data: string): boolean => !!data && data.trim() !== '';

const stringIsEmpty = (data: string): boolean =>
  data.trim() === '' || data === null || typeof data === 'undefined';

const stringHasMinimumLength = (data: string, minLength: number): boolean =>
  data.trim().length >= minLength;

const stringHasMaximumLength = (data: string, maxLength: number): boolean =>
  data.trim().length <= maxLength;

const ufExists = (uf: string): boolean =>
  VALID_UFS.indexOf(uf.toLocaleUpperCase()) > -1;

export const validateTown = (town: string): void => {
  if (stringIsEmpty(town)) {
    throwCepError(CEPErrorCode.MUNICIPIO_VAZIO);
  }

  if (!stringHasMinimumLength(town, 3)) {
    throwCepError(CEPErrorCode.MUNICIPIO_MUITO_CURTO);
  }
};

export const validateStreet = (street: string): void => {
  if (stringIsEmpty(street)) {
    throwCepError(CEPErrorCode.LOGRADOURO_VAZIO);
  }

  if (!stringHasMinimumLength(street, 3)) {
    throwCepError(CEPErrorCode.LOGRADOURO_MUITO_CURTO);
  }
};

export const validateState = (province: string): void => {
  if (stringIsEmpty(province)) {
    throwCepError(CEPErrorCode.UF_VAZIA);
  }

  if (!stringHasMinimumLength(province, 2)) {
    throwCepError(CEPErrorCode.UF_MUITO_CURTA);
  }

  if (!stringHasMaximumLength(province, 2)) {
    throwCepError(CEPErrorCode.UF_MUITO_LONGA);
  }

  if (!ufExists(province)) {
    throwCepError(CEPErrorCode.UF_NAO_EXISTE);
  }
};

export const validarCEP = () => (
  source: Observable<string>
): Observable<string> =>
  new Observable((subscriber) =>
    source.subscribe({
      next: (value) => {
        const regex = new RegExp(/^[0-9]{8}$/);

        if (ehStringValida(value) && regex.test(value)) {
          subscriber.next(value.trim());
        } else {
          subscriber.error(new CEPError(CEPErrorCode.CEP_INVALIDO));
        }
      },
      error: (error) => subscriber.error(error),
      complete: () => subscriber.complete(),
    })
  );
