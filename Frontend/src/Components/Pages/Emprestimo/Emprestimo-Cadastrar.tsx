import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cliente } from "../../../Models/Cliente";
import { Livro } from "../../../Models/Livro";
import { Emprestimo } from "../../../Models/Emprestimo";

function EmprestimoCadastrar() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [livroId, setLivroId] = useState("");

  useEffect(() => {
    carregarClientes();
    carregarLivros();
  }, []);

  function carregarClientes() {
    fetch("http://localhost:5234/cliente/listar")
      .then((resposta) => resposta.json())
      .then((clientes: Cliente[]) => {
        setClientes(clientes);
      });
  }

  function carregarLivros() {
    fetch("http://localhost:5234/livro/listar")
      .then((resposta) => resposta.json())
      .then((livros: Livro[]) => {
        setLivros(livros);
      });
  }

  function cadastrarEmprestimo(e: any) {
    e.preventDefault();
    const emprestimo = {
      clienteId: clienteId,
      livroId: livroId,
    };

    fetch("http://localhost:5234/emprestimo/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emprestimo),
    })
      .then((resposta) => resposta.json())
      .then((emprestimo: Emprestimo) => {
        console.log(emprestimo);
        setClienteId("");
        setLivroId("");
        navigate("/pages/emprestimo/listar");
      });
  }

  return (
    <div>
      <h1>Cadastrar Empréstimo</h1>
      <form onSubmit={cadastrarEmprestimo}>
        <label>Cliente:</label>
        <select
          value={clienteId}
          onChange={(e: any) => setClienteId(e.target.value)}
          required
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>

        <label>Livro:</label>
        <select
          value={livroId}
          onChange={(e: any) => setLivroId(e.target.value)}
          required
        >
          <option value="">Selecione um livro</option>
          {livros.map((livro) => (
            <option key={livro.id} value={livro.id}>
              {livro.titulo}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default EmprestimoCadastrar;
