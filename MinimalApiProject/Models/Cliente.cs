namespace MinimalApiProject;

public class Cliente
{
  public string Id { get; set; }
  public string Nome { get; set; }
  public string Endereco { get; set; }
  public string Email { get; set; }
  public string Telefone { get; set; }
  public DateTime DataCadastro { get; set; }

  public Cliente() { }

  public Cliente(string nome, string endereco, string email, string telefone, DateTime dataCadastro)
  {
    Id = Guid.NewGuid().ToString();
    Nome = nome;
    Endereco = endereco;
    Email = email;
    Telefone = telefone;
    DataCadastro = DateTime.Now;
  }
}
