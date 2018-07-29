import { BuscaEnderecoModule } from './busca-endereco.module';

describe('BuscaEnderecoModule', () => {
  let buscaEnderecoModule: BuscaEnderecoModule;

  beforeEach(() => {
    buscaEnderecoModule = new BuscaEnderecoModule();
  });

  it('should create an instance', () => {
    expect(buscaEnderecoModule).toBeTruthy();
  });
});
