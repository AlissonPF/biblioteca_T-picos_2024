import { useEffect, useState } from "react";
import { Cliente } from "../../../Models/Cliente";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ClienteDeletar(){

    const navigate = useNavigate();
    const[clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarCliente();
            
    
        }, []);

        function carregarCliente() {
            fetch("http://localhost:5234/cliente/listar")
                .then((resposta) => resposta.json())
                .then((dados) => {
                    console.log("Dados recebidos da API:", dados);
                    if (Array.isArray(dados)) {
                        setClientes(dados);
                        console.log("Clientes carregados");
                    } else {
                        setClientes([]); // Inicializa como array vazio se a resposta não for um array
                        console.warn("Dados recebidos não são um array, inicializando como array vazio");
                    }
                });
        }
    function deletar(id: string) {
        axios.delete(`http://localhost:5234/livro/deletar/${id}`)
            .then((resposta) => {
                console.log("Livro deletado:", resposta.data);
                carregarCliente(); // Recarrega a lista após deletar
            })
            .catch((error) => {
                console.error("Erro ao deletar livro:", error);
            });
      }
    // function deletar(id : string){
    //     console.log("id: " + id);
    //     axios.delete(`http://localhost:5234/cliente/deletar/${id}`) .then((resposta) => {
    //         console.log(resposta.data);
    //         setClientes(resposta.data);
    //     });
    // }
    

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
            <h1>Deletar Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereco</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Cadastro</th>
                        <th>Deletar</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente, index) => (
                        <tr key={cliente.id || index}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.endereco}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.dataCadastro}</td>
                            <td><button onClick={() => {deletar(cliente.id!);}} >Deletar</button></td>
                            <td>
                                <Link to={`/pages/cliente/alterar/${cliente.id}`}>Alterar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClienteDeletar;