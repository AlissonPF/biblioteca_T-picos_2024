using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinimalApiProject;

var builder = WebApplication.CreateBuilder(args);

// configurar a politica de CORS para liberar o acesso total
builder.Services.AddCors(
    options => options.AddPolicy("Acesso Total", configs => configs.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod())
);


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

// buscar cliente
app.MapGet("/cliente/buscar/{id}", ([FromRoute] string id, [FromServices] AppDbContext ctx ) => {

    Cliente? clienteBuscar = ctx.Clientes.FirstOrDefault(x => x.Id == id);
    if (clienteBuscar is null){
        return Results.NotFound("Cliente nao encontrado");
    }
    return Results.Ok(clienteBuscar);
});

// deletar Cliente
app.MapDelete("/cliente/deletar/{id}", ( [FromRoute] string id,
    [FromServices] AppDbContext ctx) =>
    {
        Cliente? clienteExistente = ctx.Clientes.Find(id);

        if (clienteExistente is null)
        {
            return Results.NotFound("Cliente não encontrado.");
        }

        ctx.Clientes.Remove(clienteExistente);
        ctx.SaveChanges();

        return Results.Ok("Cliente deletado com sucesso!");
    });

// alterar Cliente
app.MapPut("/cliente/atualizar/{id}", ([FromRoute] string id, [FromBody] Cliente clienteAtualizado, [FromServices] AppDbContext ctx) =>
{

    Cliente? clienteExistente = ctx.Clientes.Find(id);

    if (clienteExistente is null)
    {
        return Results.NotFound("Nome requisitado nao encontrado na lista de clientes");
    }

    clienteExistente.Nome = clienteAtualizado.Nome;
    clienteExistente.Endereco = clienteAtualizado.Endereco;
    clienteExistente.Email = clienteAtualizado.Email;
    clienteExistente.Telefone = clienteAtualizado.Telefone;

    ctx.Clientes.Update(clienteExistente);
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


// deletar livro por id
app.MapDelete("/livro/deletar/{id}", ( [FromRoute] string id,
    [FromServices] AppDbContext ctx) =>
    {
        Livro? livroExistente = ctx.Livros.Find(id);

        if (livroExistente is null)
        {
            return Results.NotFound("Livro não encontrado.");
        }

        ctx.Livros.Remove(livroExistente);
        ctx.SaveChanges();

        return Results.Ok("Livro deletado com sucesso!");
    });


// alterar Livro
app.MapPut("/livro/atualizar/{id}", ([FromRoute] string id, [FromBody] Livro livroAtualizado, [FromServices] AppDbContext ctx) =>
{

    Livro? livroExistente = ctx.Livros.FirstOrDefault(p => p.Id == id);

    if (livroExistente is null)
    {
        return Results.NotFound("Nome requisitado nao encontrado na lista de livros");
    }

    livroExistente.Titulo = livroAtualizado.Titulo;
    livroExistente.Autor = livroAtualizado.Autor;
    livroExistente.ISBN = livroAtualizado.ISBN;
    livroExistente.Categoria = livroAtualizado.Categoria;

    ctx.SaveChanges();
    return Results.Ok($"Livro {livroAtualizado.Titulo} alterado com sucesso!");
});

// Fim CRUD livros

// CRUD Emprestimo

/*app.MapGet("/emprestimo/listar", async ([FromServices] AppDbContext ctx) =>
{
    var emprestimos = await ctx.Emprestimos
                              .Include(e => e.Cliente)
                              .Include(e => e.Livro)
                              .ToListAsync();
    
    if (emprestimos.Any())
    {
        return Results.Ok(emprestimos);
    }

    return Results.NotFound("Não existem empréstimos registrados!");
});*/

app.MapGet("/emprestimo/listar", async ([FromServices] AppDbContext ctx) =>
{
    var emprestimos = await ctx.Emprestimos
                              .Include(e => e.Cliente)
                              .Include(e => e.Livro)
                              .ToListAsync();

    if (emprestimos.Any())
    {
        var emprestimosFormatados = emprestimos.Select(e => new
        {
            e.Id,
            Cliente = new 
            {
                e.Cliente.Id,
                e.Cliente.Nome
            },
            Livro = new
            {
                e.Livro.Id,
                e.Livro.Titulo
            },
            DataEmprestimo = e.DataEmprestimo.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture),
            DataDevolucaoPrevista = e.DataDevolucaoPrevista.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture),
            e.StatusEmprestimo
        });

        return Results.Ok(emprestimosFormatados);
    }

    return Results.NotFound("Não existem empréstimos registrados!");
});


app.MapPost("/emprestimo/cadastrar", ([FromServices] AppDbContext ctx, [FromBody] Emprestimo emprestimo) =>
{

    Cliente? cliente = ctx.Clientes.FirstOrDefault(l => l.Id == emprestimo.ClienteId);
    Livro? livro = ctx.Livros.FirstOrDefault(l => l.Id == emprestimo.LivroId);

    if (cliente is null || livro is null)
    {
        return Results.BadRequest("Cliente ou Livro não encontrado!");
    }

    emprestimo.Cliente = cliente;
    emprestimo.Livro = livro;

    ctx.Emprestimos.Add(emprestimo);
    ctx.SaveChanges();
    return Results.Created("Emprestimo cadastrado com sucesso! ", emprestimo);
});

app.MapPut("/emprestimo/atualizar/{id}", async ([FromServices] AppDbContext ctx, string id) =>
{
    var emprestimo = await ctx.Emprestimos
                              .FirstOrDefaultAsync(e => e.Id == id);

    if (emprestimo == null)
    {
        return Results.NotFound("Empréstimo não encontrado.");
    }

    // Verifica se a data de devolução é 14 dias após a data de empréstimo
    var diff = (emprestimo.DataDevolucaoPrevista - emprestimo.DataEmprestimo).Days;

    if (diff == 14)
    {
        // Adiciona mais 14 dias na data de devolução
        emprestimo.DataDevolucaoPrevista = emprestimo.DataDevolucaoPrevista.AddDays(14);
        await ctx.SaveChangesAsync();
        return Results.Ok("Data de devolução atualizada com sucesso.");
    }
    else if (diff == 28)
    {
        // Se já foi adicionado antes, não permite mais renovação
        return Results.BadRequest("Este empréstimo não pode mais ser renovado.");
    }
    else
    {
        // Se a diferença de dias não é 14 ou 28, retorna um erro genérico
        return Results.BadRequest("A data de devolução não pode ser atualizada.");
    }
});

app.MapPut("/emprestimo/deletar/{id}", ([FromRoute] string id, [FromServices] AppDbContext ctx) =>
{

    Emprestimo? emprestimoExiste = ctx.Emprestimos.FirstOrDefault(p => p.Id == id);

    if (emprestimoExiste is null)
    {
        return Results.NotFound("Emprestimo nao encontrado!");
    }
    if(emprestimoExiste.StatusEmprestimo == "Pendente"){
    emprestimoExiste.StatusEmprestimo = "Devolvido";
    } else if (emprestimoExiste.StatusEmprestimo == "Devolvido"){
        return Results.Ok("Emprestimo já devolvido!");
    }

    ctx.SaveChanges();
    return Results.Ok("Emprestimo atualizado");
});

// Categorias

app.MapPost("/categoria/cadastrar", ([FromBody] Categoria categoria, [FromServices] AppDbContext ctx) =>
{

    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

app.MapGet("/categoria/listar",
    ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

app.MapDelete("/categoria/deletar/{id}", ([FromServices] AppDbContext ctx, [FromRoute] string id) =>
{
    Categoria? categoriaExistente = ctx.Categorias.FirstOrDefault(p => p.Id == id);

        if (categoriaExistente == null)
        {
            return Results.NotFound("Categoria não encontrado.");
        }

        ctx.Categorias.Remove(categoriaExistente);
        ctx.SaveChanges();

        return Results.Ok("Categoria deletado com sucesso!");
});

app.UseCors("Acesso Total");
app.Run();
