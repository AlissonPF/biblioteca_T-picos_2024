namespace MinimalApiProject;

public class Categoria
{
    //Construtores
    public Categoria()
    {
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    public string? Id { get; set; }
    public string? Nome { get; set; }
    public DateTime CriadoEm { get; set; }
}