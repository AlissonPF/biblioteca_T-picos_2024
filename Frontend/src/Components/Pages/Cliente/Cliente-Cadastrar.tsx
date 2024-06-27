import { useEffect, useState } from "react";
import { Cliente } from "../../../Models/Cliente";
import { useNavigate } from "react-router-dom";

function ClienteCadastrar(){

    const navigate = useNavigate();
    const[clientes, setCliente] = useState<Cliente[]>([]);
    const[nome, SetNome] = useState("");
    const[endereco, SetEndereco] = useState("");
    const[email, SetEmail] = useState("");
    const[telefone, SetTelefone] = useState("");

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarCliente();
            
    
        }, []);

        function carregarCliente(){
            fetch("http://localhost:5234/cliente/listar").then((resposta) => resposta.json()).then((clientes : Cliente[]) =>
                {
                    setCliente(clientes);
                });
        }

    function cadastrarCliente(e : any){
        e.preventDefault();
        const cliente : Cliente = {
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone,
        };

        fetch("http://localhost:5234/cliente/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        }).then((resposta) => resposta.json()).then((cliente : Cliente) =>
            {
                console.log(cliente);
                SetNome("");
                SetEndereco("");
                SetEmail("");
                SetTelefone("");
                // navega para um outro componente se tudo der certo
                navigate("/pages/cliente/listar");
            });
    }

    return (
        <div>
            <h1>Cadastrar Cliente</h1>
            <form onSubmit={cadastrarCliente}>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e : any) => SetNome(e.target.value)} required />

            <label>Endereço:</label>
            <input type="text" value={endereco} onChange={(e : any) => SetEndereco(e.target.value)} required />

            <label>Email:</label>
            <input type="text" value={email} onChange={(e : any) => SetEmail(e.target.value)} required />

            <label>Telefone:</label>
            <input type="text" value={telefone} onChange={(e : any) => SetTelefone(e.target.value)} required />

            <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default ClienteCadastrar;