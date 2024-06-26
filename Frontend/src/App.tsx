import React from 'react';
import LivroListar from './Components/Pages/Livro/Livro-Consultar';
import ClienteListar from './Components/Pages/Cliente/Cliente-Consultar';
import EmprestimoListar from './Components/Pages/Emprestimo/Emprestimo-Consultar';

function App() {
  return (
    <div>
      <h1>Biblioteca</h1>
      <LivroListar></LivroListar>
      <hr></hr>
      <ClienteListar></ClienteListar>
      <hr />
      <EmprestimoListar></EmprestimoListar>
    </div>
  );
}

export default App;
