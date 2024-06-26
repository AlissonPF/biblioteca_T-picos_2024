import { useEffect, useState } from "react";
import { Cliente } from "../../../Models/Cliente";

function ClienteListar(){

    const[clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarCliente();
            
    
        }, []);

    function carregarCliente(){
        fetch("http://localhost:5234/cliente/listar").then((resposta) => resposta.json()).then((clientes : Cliente[]) =>
            {
                setClientes(clientes);
                console.log("Cliente carregado");
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
            <h1>Lista de Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereco</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Cadastro</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClienteListar;