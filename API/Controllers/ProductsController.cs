using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[Controller]")]
public class ProductController : ControllerBase
{

    private readonly DataContext _context;
    public ProductController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    // api/products/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProducts(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }
        var products = await _context.Products.FindAsync(id);
        if (products == null)
        {
            return NotFound();
        }

        return Ok(products);
    }


}