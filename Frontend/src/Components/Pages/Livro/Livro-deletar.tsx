import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Livro } from "../../../Models/Livro";

function LivroDeletar(){

    const navigate = useNavigate();
    const[livros, setLivros] = useState<Livro[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarLivro();
            
    
        }, []);

        function carregarLivro() {
          fetch("http://localhost:5234/livro/listar")
              .then((resposta) => resposta.json())
              .then((dados) => {
                  console.log("Dados recebidos da API:", dados);
                  if (Array.isArray(dados)) {
                      setLivros(dados);
                      console.log("Livros carregados");
                  } else {
                      setLivros([]); // Inicializa como array vazio se a resposta não for um array
                      console.warn("Dados recebidos não são um array, inicializando como array vazio");
                  }
              });
      }

    function deletarLivro(id: string) {
      axios.delete(`http://localhost:5234/livro/deletar/${id}`)
          .then((resposta) => {
              console.log("Livro deletado:", resposta.data);
              carregarLivro(); // Recarrega a lista após deletar
          })
          .catch((error) => {
              console.error("Erro ao deletar livro:", error);
          });
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
            <h1>Deletar Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereco</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Cadastro</th>
                        <th>Deletar</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <tr key={livro.id || index}>
                            <td>{livro.id}</td>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.isbn}</td>
                            <td>{livro.categoria}</td>
                            <td>{livro.dataCadastro}</td>
                            <td><button onClick={() => {deletarLivro(livro.id!);}} >Deletar</button></td>
                            <td>
                                <Link to={`/pages/livro/alterar/${livro.id}`}>Alterar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LivroDeletar;