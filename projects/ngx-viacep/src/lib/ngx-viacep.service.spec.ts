import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgxViacepService } from './ngx-viacep.service';
import { Endereco } from '@models/endereco';
import { BASE_URL } from '@models/constantes';

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

    service.buscarPorCep(cep).then((endereco) => {
      expect(endereco.cep).toEqual(cep);
      expect(endereco).toEqual(enderecoResponse);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/${cep}/json`);
    req.flush(enderecoResponse);
  });
});
