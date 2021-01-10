import { CEPError } from '../model/cep-error';
import { CEPErrorCode } from '../model/cep-error-code';
import { UFS_VALIDAS } from '../model/constantes';
import { Observable } from 'rxjs';

const throwCepError = (error: CEPErrorCode) => {
  throw new CEPError(error);
};

const ehStringValida = (data: string): boolean => !!data && data.trim() !== '';

const hasMinLength = (data: string, minLength: number): boolean =>
  data.trim().length >= minLength;

const hasMaxLength = (data: string, maxLength: number): boolean =>
  data.trim().length <= maxLength;

const validarMunicipio = (municipio: string): void => {
  if (!ehStringValida(municipio)) {
    throwCepError(CEPErrorCode.MUNICIPIO_VAZIO);
  }

  if (!hasMinLength(municipio, 3)) {
    throwCepError(CEPErrorCode.MUNICIPIO_MUITO_CURTO);
  }
};

const validarLogradouro = (logradouro: string): void => {
  if (!ehStringValida(logradouro)) {
    throwCepError(CEPErrorCode.LOGRADOURO_VAZIO);
  }

  if (!hasMinLength(logradouro, 3)) {
    throwCepError(CEPErrorCode.LOGRADOURO_MUITO_CURTO);
  }
};

const validarUF = (uf: string): void => {
  if (!ehStringValida(uf)) {
    throwCepError(CEPErrorCode.UF_VAZIA);
  }

  if (!hasMinLength(uf, 2)) {
    throwCepError(CEPErrorCode.UF_MUITO_CURTA);
  }

  if (!hasMaxLength(uf, 2)) {
    throwCepError(CEPErrorCode.UF_MUITO_LONGA);
  }

  if (!UFS_VALIDAS.some((it) => it === uf)) {
    throwCepError(CEPErrorCode.UF_NAO_EXISTE);
  }
};

export const validarCEP = () => (
  source: Observable<string>
): Observable<string> =>
  new Observable((subscriber) =>
    source.subscribe({
      next: (cep) => {
        try {
          const regex = new RegExp(/^[0-9]+$/);
          if (!ehStringValida(cep)) {
            throwCepError(CEPErrorCode.CEP_VAZIO);
          }
          if (!regex.test(cep)) {
            throwCepError(CEPErrorCode.CEP_INVALIDO);
          }
          if (cep.length < 8) {
            throwCepError(CEPErrorCode.CEP_MUITO_CURTO);
          }
          if (cep.length > 8) {
            throwCepError(CEPErrorCode.CEP_MUITO_LONGO);
          }
          subscriber.next(cep.trim());
        } catch (e) {
          subscriber.error(e);
        }
      },
      error: (error) => subscriber.error(error),
      complete: () => subscriber.complete(),
    })
  );

interface EnderecoPesquisa {
  uf: string;
  logradouro: string;
  municipio: string;
}

export const validarEndereco = () => (
  source: Observable<EnderecoPesquisa>
): Observable<EnderecoPesquisa> =>
  new Observable((subscriber) =>
    source.subscribe({
      next: ({ uf, logradouro, municipio }) => {
        try {
          validarUF(uf);
          validarMunicipio(municipio);
          validarLogradouro(logradouro);
        } catch (e) {
          subscriber.error(e);
        }
        subscriber.next({ uf, logradouro, municipio });
      },
      error: (error) => subscriber.error(error),
      complete: () => subscriber.complete(),
    })
  );
