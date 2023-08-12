import { Observable } from 'rxjs';
export declare const validarCEP: () => (source: Observable<string>) => Observable<string>;
interface EnderecoPesquisa {
    uf: string;
    logradouro: string;
    municipio: string;
}
export declare const validarEndereco: () => (source: Observable<EnderecoPesquisa>) => Observable<EnderecoPesquisa>;
export {};
//# sourceMappingURL=index.d.ts.map