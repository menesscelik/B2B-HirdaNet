using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;
    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<CartDTO>> GetCart()
    {
        return CartToDTO(await GetOrCreate(GetCustomerId()));
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreate(GetCustomerId());

        var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);

        if (product == null)
            return NotFound("the product is not in database");

        if (quantity <= 0)
            return BadRequest(new ProblemDetails { Title = "Quantity must be greater than zero" });

        if (product.Stock < quantity)
            return BadRequest(new ProblemDetails { Title = "Yeterli stok yok" });

        cart.AddItem(product, quantity);
        product.Stock -= quantity;

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));

        return BadRequest(new ProblemDetails { Title = "The product can not be added to cart" });
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreate(GetCustomerId());

        if (quantity <= 0)
            return BadRequest(new ProblemDetails { Title = "Quantity must be greater than zero" });

        var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);
        if (product == null)
            return NotFound("the product is not in database");

        var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
        if (existingItem == null)
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));

        var removeQty = Math.Min(quantity, existingItem.Quantity);
        cart.DeleteItem(productId, removeQty);
        product.Stock += removeQty;

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));

        return BadRequest(new ProblemDetails { Title = "Problem removing item from the cart" });
    }

    private string GetCustomerId()
    {
        return User.Identity?.Name ?? Request.Cookies["customerId"]!;
    }
    private async Task<Cart> GetOrCreate(string custId)
    {
        var cart = await _context.Carts
                    .Include(i => i.CartItems)
                    .ThenInclude(i => i.Product)
                    .Where(i => i.CustomerId == custId)
                    .FirstOrDefaultAsync();

        if (cart == null)
        {
            var customerId = User.Identity?.Name;

            if (string.IsNullOrEmpty(customerId))
            {
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };

                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }

            cart = new Cart { CustomerId = customerId };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return cart;
    }

    private CartDTO CartToDTO(Cart cart)
    {
        return new CartDTO
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            CartItems = cart.CartItems.Select(item => new CartItemDTO
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                Quantity = item.Quantity,
                ImageUrl = item.Product.ImageUrl
            }).ToList()
        };
    }
}