namespace MinimalApiProject;

public class Livro
{
  public string Id { get; set; }
  public string? Titulo { get; set; }
  public string? Autor { get; set; }
  public string? ISBN { get; set; }
  public string? Categoria { get; set; }
  public string? Status { get; set; } // Disponível, emprestado, reservado, etc.
  public DateTime DataCadastro { get; set; }

  public Livro()
  {
    Id = Guid.NewGuid().ToString();
    DataCadastro = DateTime.Now;
  }

  public Livro(string titulo, string autor, string isbn, string categoria)
  {
    Id = Guid.NewGuid().ToString();
    Titulo = titulo;
    Autor = autor;
    ISBN = isbn;
    Categoria = categoria;
    Status = "Disponível";
    DataCadastro = DateTime.Now;
  }
}
