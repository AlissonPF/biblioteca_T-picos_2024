import React from 'react';
import LivroListar from './Components/Pages/Livro/Livro-Consultar';
import ClienteListar from './Components/Pages/Cliente/Cliente-Consultar';

function App() {
  return (
    <div>
      <h1>Biblioteca</h1>
      <LivroListar></LivroListar>
      <hr></hr>
      <ClienteListar></ClienteListar>
    </div>
  );
}

export default App;
