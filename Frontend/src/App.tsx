import React from 'react';
import LivroListar from './Components/Pages/Livro/Livro-Consultar';
import ClienteListar from './Components/Pages/Cliente/Cliente-Consultar';
import EmprestimoListar from './Components/Pages/Emprestimo/Emprestimo-Consultar';
import ClienteCadastrar from './Components/Pages/Cliente/Cliente-Cadastrar';
import ClienteDeletar from './Components/Pages/Cliente/Cliente-Deletar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ClienteAlterar from './Components/Pages/Cliente/Cliente-Alterar';
import LivroCadastrar from './Components/Pages/Livro/Livro-cadastrar';
import LivroDeletar from './Components/Pages/Livro/Livro-deletar';

function App() {
  return (
    <div>
      <h1>Biblioteca</h1>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li><Link to={"/pages/cliente/listar"}>Listar Cliente</Link></li>
            <li><Link to={"/pages/cliente/cadastrar"}>Cadastrar Clientes</Link></li>
            <li><Link to={"/pages/cliente/deletar"}>Deletar ou Alterar Clientes</Link></li>
            <li><Link to={"/pages/livro/listar"}>Listar Livros</Link></li>
            <li><Link to={"/pages/livro/cadastrar"}>Cadastrar Livro</Link></li>
            <li><Link to={"/pages/livro/deletar"}>Deletar ou Alterar Livros</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/pages/cliente/listar' element={<ClienteListar></ClienteListar>} />
          <Route path='/pages/cliente/cadastrar' element={<ClienteCadastrar></ClienteCadastrar>} />
          <Route path='/pages/cliente/deletar' element={<ClienteDeletar></ClienteDeletar>} />
          <Route path='/pages/cliente/alterar/:id' element={<ClienteAlterar></ClienteAlterar>} />
          <Route path='/pages/livro/listar' element={<LivroListar></LivroListar>} />
          <Route path='/pages/livro/cadastrar' element={<LivroCadastrar></LivroCadastrar>} />
          <Route path='/pages/livro/deletar' element={<LivroDeletar></LivroDeletar>} />
        </Routes>
      </BrowserRouter>      
      <hr />
      <h1>Emprestimos</h1>
      <EmprestimoListar></EmprestimoListar>
    </div>
  );
}

export default App;
