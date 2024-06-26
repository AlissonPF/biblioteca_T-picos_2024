import { Cliente } from "../Models/Cliente";
import { Livro } from "../Models/Livro";


export interface Emprestimo {
    id: string;
    clienteId: string;
    cliente: Cliente;
    livroId: string;
    livro: Livro;
    dataEmprestimo: string;
    dataDevolucaoPrevista: string;
    statusEmprestimo: string;
}