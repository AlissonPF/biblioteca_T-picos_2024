using Microsoft.AspNetCore.Mvc;
using MinimalApiProject;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

app.MapGet("/", () => "API Biblioteca");

// CRUD Clientes

// Cadastrar cliente
app.MapPost("/cliente/cadastrar", ([FromBody]  Cliente novoCliente,
    [FromServices] AppDbContext ctx) =>
{

    ctx.Clientes.Add(novoCliente);
    ctx.SaveChanges();
    return Results.Created("Cliente cadastrado com sucesso! ", novoCliente);

});

// listar Clientes
app.MapGet("/cliente/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Clientes.Any())
    {
        return Results.Ok(ctx.Clientes.ToList());
    }

    return Results.NotFound("Não existem clientes registrados!");
});

// deletar Cliente
app.MapDelete("/cliente/deletar/{nome}", ( [FromRoute] string nome,
    [FromServices] AppDbContext ctx) =>
    {
        Cliente? clienteExistente = ctx.Clientes.FirstOrDefault(p => p.Nome == nome);

        if (clienteExistente == null)
        {
            return Results.NotFound("Cliente não encontrado.");
        }

        ctx.Clientes.Remove(clienteExistente);
        ctx.SaveChanges();

        return Results.Ok("Cliente deletado com sucesso!");
    });

// alterar Cliente
app.MapPut("/cliente/atualizar/{Nome}", ([FromRoute] string nome, [FromBody] Cliente clienteAtualizado, [FromServices] AppDbContext ctx) =>
{

    Cliente? clienteExistente = ctx.Clientes.FirstOrDefault(p => p.Nome == nome);

    if (clienteExistente is null)
    {
        return Results.NotFound("Nome requisitado nao encontrado na lista de clientes");
    }

    clienteExistente.Nome = clienteAtualizado.Nome;
    clienteExistente.Endereco = clienteAtualizado.Endereco;
    clienteExistente.Email = clienteAtualizado.Email;
    clienteExistente.Telefone = clienteAtualizado.Telefone;

    ctx.SaveChanges();
    return Results.Ok($"Cliente {clienteExistente.Nome} alterado com sucesso!");
});

// Fim CRUD Clientes

// CRUD Livros

// Cadastrar livro
app.MapPost("/livro/cadastrar", ([FromBody]  Livro novoLivro,
    [FromServices] AppDbContext ctx) =>
{

    ctx.Livros.Add(novoLivro);
    ctx.SaveChanges();
    return Results.Created("Livro cadastrado com sucesso! ", novoLivro);

});

// listar Livros
app.MapGet("/livro/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Livros.Any())
    {
        return Results.Ok(ctx.Livros.ToList());
    }

    return Results.NotFound("Não existem livros registrados!");
});

// deletar Livro
app.MapDelete("/livro/deletar/{titulo}", ( [FromRoute] string titulo,
    [FromServices] AppDbContext ctx) =>
    {
        Livro? livroExistente = ctx.Livros.FirstOrDefault(p => p.Titulo == titulo);

        if (livroExistente == null)
        {
            return Results.NotFound("Livro não encontrado.");
        }

        ctx.Livros.Remove(livroExistente);
        ctx.SaveChanges();

        return Results.Ok("Livro deletado com sucesso!");
    });

// alterar Livro
app.MapPut("/livro/atualizar/{titulo}", ([FromRoute] string titulo, [FromBody] Livro livroAtualizado, [FromServices] AppDbContext ctx) =>
{

    Livro? livroExistente = ctx.Livros.FirstOrDefault(p => p.Titulo == titulo);

    if (livroExistente is null)
    {
        return Results.NotFound("Nome requisitado nao encontrado na lista de livros");
    }

    livroExistente.Titulo = livroAtualizado.Titulo;
    livroExistente.Autor = livroAtualizado.Autor;
    livroExistente.ISBN = livroAtualizado.ISBN;
    livroExistente.Categoria = livroAtualizado.Categoria;
    livroExistente.Status = livroAtualizado.Status;

    ctx.SaveChanges();
    return Results.Ok($"Livro {livroAtualizado.Titulo} alterado com sucesso!");
});


app.Run();
