import { useEffect, useState } from "react";
import { Livro } from "../../../Models/Livro";
import { Categoria } from "../../../Models/Categoria";

function LivroListar() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarLivros();
    carregarCategorias();
  }, []);

  function carregarLivros() {
    fetch("http://localhost:5234/livro/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setLivros(dados);
        } else {
          setLivros([]);
        }
      });
  }

  function carregarCategorias() {
    fetch("http://localhost:5234/categoria/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCategorias(dados);
        } else {
          setCategorias([]);
        }
      });
  }

  function obterNomeCategoria(id: string) {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nome : "Sem categoria";
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
              <td>{obterNomeCategoria(livro.categoriaId || "")}</td>
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
