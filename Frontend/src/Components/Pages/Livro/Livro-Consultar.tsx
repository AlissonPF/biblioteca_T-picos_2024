import { useEffect, useState } from "react";
import { Livro } from "../../../Models/Livro";

function LivroListar(){

    const[livros, setLivros] = useState<Livro[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarLivro();
            
    
        }, []);

    function carregarLivro(){
        fetch("http://localhost:5234/livro/listar").then((resposta) => resposta.json()).then((livros : Livro[]) =>
            {
                setLivros(livros);
                console.log("livro carregado");
            })
    }

    return (
        <div>
            <style>{`
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #ddd;
                }
            `}</style>
            <h1>Lista de Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Data de Cadastro</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <tr key={livro.id || index}>
                            <td>{livro.id}</td>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.isbn}</td>
                            <td>{livro.categoria}</td>
                            <td>{livro.status}</td>
                            <td>{livro.dataCadastro}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LivroListar;