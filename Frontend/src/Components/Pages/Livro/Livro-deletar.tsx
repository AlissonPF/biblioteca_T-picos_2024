import { useState } from "react";

function LivroDeletar() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  function deletarLivro(e: any) {
    e.preventDefault();

    fetch(`http://localhost:5234/api/livro/deletar/${titulo}`, {
      method: "DELETE",
    })
      .then((resposta) => {
        if (!resposta.ok) {
          return resposta.text().then((text) => {
            throw new Error(text || "Erro ao deletar o livro.");
          });
        }
        return resposta.text();
      })
      .then((mensagem) => {
        setMensagem(mensagem);
        setTitulo("");
      })
      .catch((error) => {
        console.error("Erro:", error);
        setMensagem(`Erro: ${error.message}`);
      });
  }

  return (
    <div>
      <h1>Deletar Livro</h1>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      <form onSubmit={deletarLivro}>
        <label>Título:</label>
        <input
          type="text"
          placeholder="Digite o título do livro"
          
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <br />
        <button type="submit">Deletar</button>
      </form>
    </div>
  );
}

export default LivroDeletar;
