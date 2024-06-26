using Microsoft.EntityFrameworkCore;
using MinimalApiProject;

public class AppDbContext : DbContext
{
  public DbSet<Cliente> Clientes { get; set; }
  public DbSet<Livro> Livros { get; set; }
  public DbSet<Emprestimo> Emprestimos { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlite("Data Source=bancoBiblioteca.db");
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Emprestimo>()
            .HasOne(e => e.Cliente)
            .WithMany()
            .HasForeignKey(e => e.ClienteId);

        modelBuilder.Entity<Emprestimo>()
            .HasOne(e => e.Livro)
            .WithMany()
            .HasForeignKey(e => e.LivroId);
    }
}
