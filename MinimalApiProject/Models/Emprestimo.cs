namespace MinimalApiProject;

public class Emprestimo
{
  public string Id { get; set; }
  public string ClienteId { get; set; }
  public Cliente Cliente { get; set; } // Navegação para a entidade Cliente
  public string LivroId { get; set; }
  public Livro Livro { get; set; } // Navegação para a entidade Livro
  public DateTime DataEmprestimo { get; set; }
  public DateTime DataDevolucaoPrevista { get; set; }
  public DateTime? DataDevolucaoReal { get; set; } // Null se não devolvido
  public decimal? ValorMulta { get; set; }
  public string StatusEmprestimo { get; set; } // Pendente, devolvido, atrasado, etc.

  public Emprestimo() { }

  // Construtor com todos os parâmetros
  public Emprestimo(string id, string clienteId, Cliente cliente, string livroId, Livro livro,
      DateTime dataEmprestimo, DateTime dataDevolucaoPrevista)
  {
    Id = Guid.NewGuid().ToString();
    ClienteId = clienteId;
    Cliente = cliente;
    LivroId = livroId;
    Livro = livro;
    DataEmprestimo = DateTime.Now;
    DataDevolucaoPrevista = dataDevolucaoPrevista;
    DataDevolucaoReal = null;
    ValorMulta = null;
    StatusEmprestimo = "Pendente";
  }
}
