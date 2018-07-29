export class ErroCep extends Error{

  get descricao(): string {
    return this.message;
  }
}
