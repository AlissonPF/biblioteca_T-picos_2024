using Microsoft.EntityFrameworkCore;
using MinimalApiProject;

public class AppDbContext : DbContext
{
  public DbSet<Cliente> Clientes { get; set; }
  public DbSet<Livro> Livros { get; set; }
  public DbSet<Emprestimo> Emprestimos { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlite("Data Source=bora.db");
  }
}
