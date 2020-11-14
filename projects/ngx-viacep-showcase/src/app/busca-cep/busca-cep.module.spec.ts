import { BuscaCepModule } from './busca-cep.module';

describe('BuscaCepModule', () => {
  let buscaCepModule: BuscaCepModule;

  beforeEach(() => {
    buscaCepModule = new BuscaCepModule();
  });

  it('should create an instance', () => {
    expect(buscaCepModule).toBeTruthy();
  });
});
