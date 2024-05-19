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
  public string? StatusEmprestimo { get; set; } // Pendente, devolvido, atrasado, etc.

  public Emprestimo() {
    Id = Guid.NewGuid().ToString();
    DataEmprestimo = DateTime.Now;
    DataDevolucaoPrevista = DateTime.Now.AddDays(14);
    StatusEmprestimo = "Pendente";
   }

  // Construtor com todos os parâmetros
  public Emprestimo(string clienteId, Cliente cliente, string livroId, Livro livro)
  {
    Id = Guid.NewGuid().ToString();
    ClienteId = clienteId;
    Cliente = cliente;
    LivroId = livroId;
    Livro = livro;
    DataEmprestimo = DateTime.Now;
    DataDevolucaoPrevista = DateTime.Now.AddDays(14);
    StatusEmprestimo = "Pendente";
  }
}
