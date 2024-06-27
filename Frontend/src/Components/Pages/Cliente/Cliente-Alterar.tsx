import { useEffect, useState } from "react";
import { Cliente } from "../../../Models/Cliente";
import { useNavigate, useParams } from "react-router-dom";

function ClienteAlterar(){

    const { id } = useParams();
    const navigate = useNavigate();
    const[clientes, setCliente] = useState<Cliente[]>([]);
    const[nome, SetNome] = useState("");
    const[endereco, SetEndereco] = useState("");
    const[email, SetEmail] = useState("");
    const[telefone, SetTelefone] = useState("");

    useEffect(() => {
        if (id) {
          fetch(`http://localhost:5234/cliente/buscar/${id}`)
            .then((resposta) => resposta.json())
            .then((cliente: Cliente) => {
              SetNome(cliente.nome);
              SetEndereco(cliente.endereco);
              SetEmail(cliente.email);
              SetTelefone(cliente.telefone);
            })
            .catch((error) => {
              console.error("Erro ao carregar cliente:", error);
            });
        }
      }, [id]);
      

    function alterarCliente(e : any){
        const cliente : Cliente = {
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone,
        };

        fetch(`http://localhost:5234/cliente/atualizar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        }).then((resposta) => resposta.json()).then((cliente : Cliente) =>
            {
                // navega para um outro componente se tudo der certo
                navigate("/pages/cliente/listar");
            });
            e.preventDefault();
    }

    return (
        <div>
            <h1>Alterar Cliente</h1>
            <form onSubmit={alterarCliente}>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e : any) => SetNome(e.target.value)} required />

            <label>Endereço:</label>
            <input type="text" value={endereco} onChange={(e : any) => SetEndereco(e.target.value)} required />

            <label>Email:</label>
            <input type="text" value={email} onChange={(e : any) => SetEmail(e.target.value)} required />

            <label>Telefone:</label>
            <input type="text" value={telefone} onChange={(e : any) => SetTelefone(e.target.value)} required />

            <button type="submit">Salvar</button>
            </form>
        </div>
    )
}

export default ClienteAlterar;