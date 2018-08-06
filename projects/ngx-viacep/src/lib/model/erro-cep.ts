enum ErroCepValues {
  CEP_NAO_ENCONTRADO,
  CEP_VAZIO,
  CEP_INVALIDO,
  CEP_MUITO_CURTO,
  CEP_MUITO_LONGO,
  ERRO_UF,
  ERRO_UF_MUITO_CURTA,
  ERRO_UF_MUITO_LONGA,
  ERRO_UF_NAO_EXISTE,
  ERRO_MUNICIPIO,
  ERRO_MUNICIPIO_MUITO_CURTO,
  ERRO_LOGRADOURO,
  ERRO_LOGRADOURO_MUITO_CURTO,
  ERRO_SERVIDOR
}

export class ErroCep extends Error {

  constructor( message: Extract<keyof typeof ErroCepValues, string> ) {

    super(message);
  }
}
