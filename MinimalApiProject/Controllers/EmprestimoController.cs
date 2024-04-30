using Microsoft.AspNetCore.Mvc;
using BibliotecaContext = AppDbContext;

namespace MinimalApiProject;

[Route("api/emprestimo/[controller]")]
[ApiController]
public class EmprestimoController
{
  private readonly BibliotecaContext _ctx;

}
