import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgxViacepService } from './ngx-viacep.service';
import { Endereco } from '@models/endereco';
import { BASE_URL } from '@models/constantes';
import { CEPError } from '@models/cep-error';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

describe('NgxViacepService', () => {
  let service: NgxViacepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NgxViacepService],
    });

    service = TestBed.inject(NgxViacepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buscarPorCep', () => {
    it('dado um CEP nulo deve retornar o erro CEP_INVALIDO', (done) => {
      service
        .buscarPorCep(null)
        .pipe(
          catchError((erro: Error) => {
            expect(erro).toBeInstanceOf(CEPError);
            expect(erro.message).toEqual('CEP_INVALIDO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP vazio deve retornar o erro CEP_INVALIDO', (done) => {
      service
        .buscarPorCep('')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_INVALIDO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com espaços deve retornar o erro CEP_VAZIO', (done) => {
      service
        .buscarPorCep('       ')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_INVALIDO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com letra deve retornar o erro CEP_INVALIDO', (done) => {
      service
        .buscarPorCep('X')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_INVALIDO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com menos de 8 numeros deve retornar o erro CEP_MUITO_CURTO', (done) => {
      service
        .buscarPorCep('1234567')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_INVALIDO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com mais de 8 numeros deve retornar o erro CEP_MUITO_LONGO', (done) => {
      service
        .buscarPorCep('123456789')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_INVALIDO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP valido deve retornar um endereco', (done) => {
      const cep = '59144333';
      const enderecoResponse: Endereco = {
        cep,
        logradouro: 'string',
        complemento: 'string',
        bairro: 'string',
        localidade: 'string',
        uf: 'RN',
        unidade: 'string',
        ibge: 'string',
        gia: 'string',
      };

      service.buscarPorCep(cep).subscribe((endereco) => {
        expect(endereco.cep).toEqual(cep);
        expect(endereco).toEqual(enderecoResponse);
        done();
      });

      const req = httpMock.expectOne(`${BASE_URL}/${cep}/json`);
      req.flush(enderecoResponse);
    });

    it('dado um CEP valido, mas não encontrado, deve retornar um endereco', (done) => {
      const cep = '59144333';
      const enderecoResponse = {};

      service.buscarPorCep(cep).pipe(
        catchError((erro: Error) => {
          expect(erro.message).toEqual('CEP_NAO_ENCONTRADO');
          done();
          return EMPTY;
        })
      ).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/${cep}/json`);
      req.flush(enderecoResponse);
    });
  });

  describe('buscarPorEndereco', () => {
    it('dado um endereco com ufSigla vazia deve retornar o erro UF_VAZIA', (done) => {
      const ufSigla = '';
      const municipio = null;
      const logradouro = null;

      service
        .buscarPorEndereco(ufSigla, municipio, logradouro)
        .catch((erro: Error) => {
          expect(erro.message).toEqual('UF_VAZIA');
          done();
        });
    });

    it('dado um endereco com municipio vazia deve retornar o erro MUNICIPIO_VAZIO', (done) => {
      const ufSigla = 'RN';
      const municipio = '';
      const logradouro = null;

      service
        .buscarPorEndereco(ufSigla, municipio, logradouro)
        .catch((erro: Error) => {
          expect(erro.message).toEqual('MUNICIPIO_VAZIO');
          done();
        });
    });

    it('dado um endereco com logradouro vazia deve retornar o erro LOGRADOURO_VAZIO', (done) => {
      const ufSigla = 'RN';
      const municipio = 'ABC';
      const logradouro = '';

      service
        .buscarPorEndereco(ufSigla, municipio, logradouro)
        .catch((erro: Error) => {
          expect(erro.message).toEqual('LOGRADOURO_VAZIO');
          done();
        });
    });

    it('dado um endereco valido, mas o servidor lançar algum erro, deve retornar o erro ERRO_SERVIDOR', (done) => {
      const uf = 'RN';
      const municipio = 'ABC';
      const logradouro = 'ASDFGHJKL';

      service
        .buscarPorEndereco(uf, municipio, logradouro)
        .catch((erro: Error) => {
          expect(erro.message).toEqual('ERRO_SERVIDOR');
          done();
        });

      const req = httpMock.expectOne(
        `${BASE_URL}/${uf}/${municipio}/${logradouro}/json`
      );
      req.error(new ErrorEvent(''));
    });

    it('dado um endereco valido deve retornar o erro endereço correto', (done) => {
      const uf = 'RN';
      const municipio = 'ABC';
      const logradouro = 'ASDFGHJKL';

      const enderecoResponse: Endereco = {
        cep: 'string',
        logradouro,
        complemento: 'string',
        bairro: 'string',
        localidade: 'string',
        uf,
        unidade: 'string',
        ibge: 'string',
        gia: 'string',
      };

      service.buscarPorEndereco(uf, municipio, logradouro).then((enderecos) => {
        const found = enderecos.some((e) => e.logradouro === logradouro);
        expect(found).toBeTrue();
        done();
      });

      const req = httpMock.expectOne(
        `${BASE_URL}/${uf}/${municipio}/${logradouro}/json`
      );
      req.flush([enderecoResponse]);
    });
  });
});
