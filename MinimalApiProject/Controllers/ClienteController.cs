using Microsoft.AspNetCore.Mvc;
using BibliotecaContext = AppDbContext;

namespace MinimalApiProject;

[Route("api/cliente/[controller]")]
[ApiController]
public class ClienteController
{
  private readonly BibliotecaContext _ctx;

  [HttpPost]
  public IActionResult CadastraCliente([FromBody] Cliente cliente)
  {
    Cliente clienteExiste = _ctx.Clientes.FirstOrDefault(c => c.Email == cliente.Email);

    if (clienteExiste != null)
    {
      return BadRequest(e.message);
    }

    _ctx.Clientes.Add(cliente);
    _ctx.SaveChanges();

    return Ok(cliente, "Cliente cadastrado com sucesso.");
  }

}
