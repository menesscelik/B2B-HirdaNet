using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    public record ContactForm(string Name, string Email, string? Phone, string? Company, string Message, DateTime CreatedAt);

    private static readonly string StoragePath = Path.Combine(AppContext.BaseDirectory, "contact_messages.jsonl");

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactForm form)
    {
        var withDate = form with { CreatedAt = DateTime.UtcNow };
        var line = JsonSerializer.Serialize(withDate) + "\n";
        await System.IO.File.AppendAllTextAsync(StoragePath, line);
        return Ok();
    }
}


