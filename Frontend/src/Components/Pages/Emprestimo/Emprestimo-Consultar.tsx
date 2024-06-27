import { useEffect, useState } from "react";
import { Emprestimo } from "../../../Models/Emprestimo";
import { Cliente } from "../../..//Models/Cliente";
import { Livro } from "../../..//Models/Livro";

function EmprestimoListar(){

    const[emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarEmprestimo();
            
    
        }, []);

    function carregarEmprestimo(){
        fetch("http://localhost:5234/emprestimo/listar").then((resposta) => resposta.json()).then((emprestimos : Emprestimo[]) =>
            {
                setEmprestimos(emprestimos);
                console.log("Emprestimo carregado");
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
            <h1>Lista de Emprestimos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente ID</th>
                        <th>Cliente</th>
                        <th>Livro ID</th>
                        <th>Livro</th>
                        <th>dataEmprestimo</th>
                        <th>dataDevolução</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {emprestimos.map((emprestimo, index) => (
                        <tr key={emprestimo.id || index}>
                            <td>{emprestimo.id}</td>
                            <td>{emprestimo.clienteId}</td>
                            <td>{emprestimo.cliente?.nome}</td>
                            <td>{emprestimo.livroId}</td>
                            <td>{emprestimo.livro?.titulo}</td>
                            <td>{emprestimo.dataEmprestimo}</td>
                            <td>{emprestimo.dataDevolucaoPrevista}</td>
                            <td>{emprestimo.statusEmprestimo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmprestimoListar;