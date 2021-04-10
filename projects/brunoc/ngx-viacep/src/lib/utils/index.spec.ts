import { EMPTY, of } from 'rxjs';
import { validarCEP } from './index';
import { catchError } from 'rxjs/operators';
import { CEPError } from '../model/cep-error';

describe('Test utils functions', () => {
  describe('validarCEP', () => {
    it('Dado um cep vazio deve retornar o erro CEP_INVALIDO', (done) => {
      const cep = '';

      of(cep)
        .pipe(
          validarCEP(),
          catchError((e) => {
            expect(e).toBeInstanceOf(CEPError);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('Dado um cep com menos de 8 caracteres deve retornar o erro CEP_INVALIDO', (done) => {
      const cep = '1234567';

      of(cep)
        .pipe(
          validarCEP(),
          catchError((e) => {
            expect(e).toBeInstanceOf(CEPError);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('Dado um cep com mais de 8 caracteres deve retornar o erro CEP_INVALIDO', (done) => {
      const cep = '123456789';

      of(cep)
        .pipe(
          validarCEP(),
          catchError((e) => {
            expect(e).toBeInstanceOf(CEPError);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('Dado um cep valido deve retornar o cep', (done) => {
      const cep = '12345678';

      of(cep)
        .pipe(validarCEP())
        .subscribe((result) => {
          expect(result).toEqual(cep);
          done();
        });
    });
  });
});
