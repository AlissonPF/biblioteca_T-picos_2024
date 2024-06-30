import { useEffect, useState } from "react";
import { Livro } from "../../../Models/Livro";
import { useNavigate, useParams } from "react-router-dom";

function LivroAlterar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5234/livro/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((livro: Livro) => {
          setTitulo(livro.titulo);
          setAutor(livro.autor);
          setIsbn(livro.isbn);
        })
        .catch((error) => {
          console.error("Erro ao carregar livro:", error);
        });
    }
  }, [id]);

  function alterarLivro(e: any) {
    const livro: Livro = {
      id: id,
      titulo: titulo,
      autor: autor,
      isbn: isbn,
    };

    fetch(`http://localhost:5234/livro/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((resposta) => resposta.json())
      .then((livro: Livro) => {
        navigate("/pages/livro/listar");
      })
      .catch((error) => {
        console.error("Erro ao atualizar livro:", error);
      });
    e.preventDefault();
  }

  return (
    <div>
      <h1>Alterar Livro</h1>
      <form onSubmit={alterarLivro}>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e: any) => setTitulo(e.target.value)} required />

        <label>Autor:</label>
        <input type="text" value={autor} onChange={(e: any) => setAutor(e.target.value)} required />

        <label>ISBN:</label>
        <input type="text" value={isbn} onChange={(e: any) => setIsbn(e.target.value)} required />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default LivroAlterar;
