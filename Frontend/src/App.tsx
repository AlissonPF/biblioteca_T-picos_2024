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
import EmprestimoCadastrar from './Components/Pages/Emprestimo/Emprestimo-Cadastrar';

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
            <li><strong>Clientes</strong></li>
            <ul>
              <li><Link to={"/pages/cliente/listar"}>Listar Clientes</Link></li>
              <li><Link to={"/pages/cliente/cadastrar"}>Cadastrar Cliente</Link></li>
              <li><Link to={"/pages/cliente/deletar"}>Deletar ou Alterar Clientes</Link></li>
            </ul>
            <li><strong>Livros</strong></li>
            <ul>
              <li><Link to={"/pages/livro/listar"}>Listar Livros</Link></li>
              <li><Link to={"/pages/livro/cadastrar"}>Cadastrar Livro</Link></li>
              <li><Link to={"/pages/livro/deletar"}>Deletar ou Alterar Livros</Link></li>
            </ul>
            <li><strong>Empréstimos</strong></li>
            <ul>
              <li><Link to={"/pages/emprestimo/listar"}>Listar Empréstimos</Link></li>
              <li><Link to={"/pages/emprestimo/cadastrar"}>Realizar Empréstimo</Link></li>
            </ul>
          </ul>
        </nav>
        <Routes>
          <Route path='/pages/cliente/listar' element={<ClienteListar />} />
          <Route path='/pages/cliente/cadastrar' element={<ClienteCadastrar />} />
          <Route path='/pages/cliente/deletar' element={<ClienteDeletar />} />
          <Route path='/pages/cliente/alterar/:id' element={<ClienteAlterar />} />
          <Route path='/pages/livro/listar' element={<LivroListar />} />
          <Route path='/pages/livro/cadastrar' element={<LivroCadastrar />} />
          <Route path='/pages/livro/deletar' element={<LivroDeletar />} />
          <Route path='/pages/emprestimo/listar' element={<EmprestimoListar />} />
          <Route path='/pages/emprestimo/cadastrar' element={<EmprestimoCadastrar />} />
        </Routes>
      </BrowserRouter>      
      <hr />
    </div>
  );
}

export default App;
