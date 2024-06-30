import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LivroListar from './Components/Pages/Livro/Livro-Consultar';
import ClienteListar from './Components/Pages/Cliente/Cliente-Consultar';
import EmprestimoListar from './Components/Pages/Emprestimo/Emprestimo-Consultar';
import ClienteCadastrar from './Components/Pages/Cliente/Cliente-Cadastrar';
import ClienteDeletar from './Components/Pages/Cliente/Cliente-Deletar';
import ClienteAlterar from './Components/Pages/Cliente/Cliente-Alterar';
import LivroCadastrar from './Components/Pages/Livro/Livro-cadastrar';
import LivroDeletar from './Components/Pages/Livro/Livro-deletar';
import EmprestimoCadastrar from './Components/Pages/Emprestimo/Emprestimo-Cadastrar';
import EmprestimoDeletar from './Components/Pages/Emprestimo/Emprestimo-Deletar';
import './App.css'; // Importando o arquivo CSS
import LivroAlterar from './Components/Pages/Livro/Livro-Alterar';

function App() {
  return (
    <div className="app-container">
      <h1 className="header">Biblioteca</h1>
      <BrowserRouter>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-section-title">Clientes</li>
            <ul className="nav-sublist">
              <li className="nav-subitem">
                <Link to="/pages/cliente/listar" className="nav-sublink">Listar Clientes</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/cliente/cadastrar" className="nav-sublink">Cadastrar Cliente</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/cliente/deletar" className="nav-sublink">Deletar ou Alterar Clientes</Link>
              </li>
            </ul>
            <li className="nav-section-title">Livros</li>
            <ul className="nav-sublist">
              <li className="nav-subitem">
                <Link to="/pages/livro/listar" className="nav-sublink">Listar Livros</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/livro/cadastrar" className="nav-sublink">Cadastrar Livro</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/livro/deletar" className="nav-sublink">Deletar ou Alterar Livros</Link>
              </li>
            </ul>
            <li className="nav-section-title">Empréstimos</li>
            <ul className="nav-sublist">
              <li className="nav-subitem">
                <Link to="/pages/emprestimo/listar" className="nav-sublink">Listar Empréstimos</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/emprestimo/cadastrar" className="nav-sublink">Realizar Empréstimo</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/emprestimo/deletar" className="nav-sublink">Devolver ou Renovar Empréstimos</Link>
              </li>
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
          <Route path='/pages/livro/alterar/:id' element={<LivroAlterar />} />
          <Route path='/pages/emprestimo/listar' element={<EmprestimoListar />} />
          <Route path='/pages/emprestimo/cadastrar' element={<EmprestimoCadastrar />} />
          <Route path='/pages/emprestimo/deletar' element={<EmprestimoDeletar />} />
        </Routes>
      </BrowserRouter>      
      <footer className="footer">
        <p>Feito por Alisson e Erik</p>
      </footer>
    </div>
  );
}

export default App;
