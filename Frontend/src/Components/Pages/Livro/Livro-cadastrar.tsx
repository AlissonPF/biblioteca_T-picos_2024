import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Livro } from "../../../Models/Livro";
import { Categoria } from "../../../Models/Categoria";

function LivroCadastrar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    fetch("http://localhost:5234/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        setCategorias(categorias);
      });
  }

  function cadastrarLivro(e: any) {
    e.preventDefault();

    const livro: Livro = {
      titulo: titulo,
      autor: autor,
      isbn: isbn,
      categoriaId: categoriaId,
    };

    fetch("http://localhost:5234/livro/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((resposta) => resposta.json())
      .then((livro: Livro) => {
        navigate("/pages/livro/listar");
      });
  }

  return (
    <div>
      <h1>Cadastrar Livro</h1>
      <form onSubmit={cadastrarLivro}>
        <label>Título:</label>
        <input
          type="text"
          placeholder="Digite o título"
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Autor:</label>
        <input
          type="text"
          placeholder="Digite o autor"
          onChange={(e: any) => setAutor(e.target.value)}
        />
        <br />
        <label>ISBN:</label>
        <input
          type="text"
          placeholder="Digite o ISBN"
          onChange={(e: any) => setIsbn(e.target.value)}
        />
        <br />
        <label>Categorias:</label>
        <select onChange={(e: any) => setCategoriaId(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default LivroCadastrar;
