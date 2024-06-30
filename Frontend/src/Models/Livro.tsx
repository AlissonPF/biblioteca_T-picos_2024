export interface Livro {
    id?: string;
    titulo: string;
    autor: string;
    isbn: string;
    status?: string;
    dataCadastro?: string;
    categoriaId?: string
}