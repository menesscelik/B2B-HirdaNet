using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly DataContext _context;

    public AdminController(UserManager<AppUser> userManager, DataContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userManager.Users
            .Select(u => new { u.Id, u.Name, u.UserName, u.Email })
            .ToListAsync();
        return Ok(users);
    }

    [HttpGet("users/{userName}/orders")]
    public async Task<IActionResult> GetUserOrders(string userName)
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.CustomerId == userName)
            .ToListAsync();

        var orderDTOs = orders.Select(o => new OrderDTO
        {
            Id = o.Id,
            OrderDate = o.OrderDate,
            FirstName = o.FirstName,
            LastName = o.LastName,
            Phone = o.Phone,
            City = o.City,
            AddresLine = o.AddresLine,
            CustomerId = o.CustomerId,
            OrderStatus = o.OrderStatus,
            SubTotal = o.SubTotal,
            DeliveryFree = o.DeliveryFree,
            OrderItems = o.OrderItems.Select(oi => new OrderItemDTO
            {
                Id = oi.Id,
                ProductId = oi.ProductId,
                ProductName = oi.ProductName,
                ProductImage = oi.ProductImage,
                Price = oi.Price,
                Quantity = oi.Quantity
            }).ToList()
        }).ToList();

        return Ok(orderDTOs);
    }

    public class UpdateUserStatusDTO { public bool IsLocked { get; set; } }

    [HttpPut("users/{userName}/status")]
    public async Task<IActionResult> UpdateUserStatus(string userName, [FromBody] UpdateUserStatusDTO dto)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null) return NotFound();

        await _userManager.SetLockoutEnabledAsync(user, true);
        if (dto.IsLocked)
        {
            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow.AddYears(100));
        }
        else
        {
            await _userManager.SetLockoutEndDateAsync(user, null);
        }

        return NoContent();
    }

    [HttpDelete("users/{userName}")]
    public async Task<IActionResult> DeleteUser(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null) return NotFound();

        var result = await _userManager.DeleteAsync(user);
        if (!result.Succeeded) return BadRequest(result.Errors);

        return NoContent();
    }

    public class UpdateOrderStatusDTO { public int Status { get; set; } }

    [HttpPut("orders/{orderId}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusDTO dto)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order == null) return NotFound();

        if (!Enum.IsDefined(typeof(OrderStatus), dto.Status))
            return BadRequest(new ProblemDetails { Title = "Geçersiz sipariş durumu" });

        order.OrderStatus = (OrderStatus)dto.Status;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    public record ContactForm(string Name, string Email, string? Phone, string? Company, string Message, DateTime CreatedAt);

    [HttpGet("contact-messages")]
    public async Task<IActionResult> GetContactMessages()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "contact_messages.jsonl");
        if (!System.IO.File.Exists(path)) return Ok(new List<ContactForm>());
        var lines = await System.IO.File.ReadAllLinesAsync(path);
        var list = new List<ContactForm>();
        foreach (var line in lines)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;
            var item = JsonSerializer.Deserialize<ContactForm>(line);
            if (item != null) list.Add(item);
        }
        list.Reverse();
        return Ok(list);
    }

    [HttpDelete("contact-messages/{index}")]
    public async Task<IActionResult> DeleteContactMessage(int index)
    {
        var path = Path.Combine(AppContext.BaseDirectory, "contact_messages.jsonl");
        if (!System.IO.File.Exists(path)) return NotFound();

        var lines = await System.IO.File.ReadAllLinesAsync(path);
        if (index < 0 || index >= lines.Length) return BadRequest("Geçersiz mesaj indeksi");

        var newLines = lines.Where((line, i) => i != index).ToArray();
        await System.IO.File.WriteAllLinesAsync(path, newLines);

        return NoContent();
    }
}


