import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Emprestimo } from "../../../Models/Emprestimo";
import { Cliente } from "../../../Models/Cliente";
import { Livro } from "../../../Models/Livro";

function EmprestimoDeletar() {
  const navigate = useNavigate();
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    carregarEmprestimos();
    carregarClientes();
    carregarLivros();
  }, []);

  function carregarEmprestimos() {
    fetch("http://localhost:5234/emprestimo/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setEmprestimos(dados);
        } else {
          setEmprestimos([]);
        }
      })
      .catch((erro) => {
        setErro("Erro ao carregar empréstimos: " + erro.message);
      });
  }

  function carregarClientes() {
    fetch("http://localhost:5234/cliente/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setClientes(dados);
        } else {
          setClientes([]);
        }
      })
      .catch((erro) => {
        setErro("Erro ao carregar clientes: " + erro.message);
      });
  }

  function carregarLivros() {
    fetch("http://localhost:5234/livro/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setLivros(dados);
        } else {
          setLivros([]);
        }
      })
      .catch((erro) => {
        setErro("Erro ao carregar livros: " + erro.message);
      });
  }

  function deletarEmprestimo(id: string, status: string) {
    
    if (status === "Devolvido") {
        setMensagem("Este empréstimo já foi devolvido!");
        return;
      }

    axios.put(`http://localhost:5234/emprestimo/deletar/${id}`)
      .then(() => {
        carregarEmprestimos(); // Recarrega a lista após deletar
      })
      .catch((erro) => {
        setErro("Erro ao deletar empréstimo: " + erro.message);
      });
  }

  function atualizarEmprestimo(id: string) {
    axios.put(`http://localhost:5234/emprestimo/atualizar/${id}`)
      .then((resposta) => {
        console.log("Empréstimo atualizado:", resposta.data);
        carregarEmprestimos(); // Recarrega a lista após atualizar
      })
      .catch((erro) => {
        setErro("Emprestimo já renovado! ");
      });
  }

  function obterNomeCliente(id: string) {
    const cliente = clientes.find((cli) => cli.id === id);
    return cliente ? cliente.nome : "Sem cliente";
  }

  function obterTituloLivro(id: string) {
    const livro = livros.find((liv) => liv.id === id);
    return livro ? livro.titulo : "Sem livro";
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
      <h1>Devolver ou Renovar Emprestimos</h1>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Livro</th>
            <th>Data de Empréstimo</th>
            <th>Data de Devolução</th>
            <th>Status</th>
            <th>Deletar</th>
            <th>Atualizar</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo, index) => (
            <tr key={emprestimo.id || index}>
              <td>{emprestimo.id}</td>
              <td>{emprestimo.cliente.nome}</td>
              <td>{emprestimo.livro.titulo}</td>
              <td>{emprestimo.dataEmprestimo}</td>
              <td>{emprestimo.dataDevolucaoPrevista}</td>
              <td>{emprestimo.statusEmprestimo}</td>
              <td>
                <button onClick={() => deletarEmprestimo(emprestimo.id!, emprestimo.statusEmprestimo)}>Deletar</button>
              </td>
              <td>
                <button onClick={() => atualizarEmprestimo(emprestimo.id!)}>Atualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmprestimoDeletar;
