import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Livro } from "../../../Models/Livro";

function LivroCadastrar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [categoria, setCategoria] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function cadastrarLivro(e: any) {
    e.preventDefault();

    const livro: Livro = {
      titulo: titulo,
      autor: autor,
      isbn: isbn,
      categoria: categoria,
    };

    fetch("http://localhost:5234/livro/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
    }).then((resposta) => resposta.json()).then((livro : Livro) =>
        {
            console.log(livro);
            setTitulo("");
            setAutor("");
            setIsbn("");
            setCategoria("");
            // navega para um outro componente se tudo der certo
            navigate("/pages/livro/listar");
        });
  }

  return (
    <div>
      <h1>Cadastrar Livro</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
        <label>Categoria:</label>
        <input
          type="text"
          placeholder="Digite a categoria"
          onChange={(e: any) => setCategoria(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default LivroCadastrar;
