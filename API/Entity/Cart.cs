namespace API.Entity;

public class Cart
{
    public int CartId { get; set; }
    public string CustomerId { get; set; } = null!;
    public List<CartItem> CartItems { get; set; } = new();

    public void AddItem(Product product, int Quantity)
    {
        var item = CartItems.Where(c => c.ProductId == product.Id).FirstOrDefault();
        if (item == null)
        {
            CartItems.Add(new CartItem { Product = product, Quantity = Quantity });

        }
        else
        {
            item.Quantity += Quantity;
        }
    }
    public void DeleteItem(int productId, int quantity)
    {
        var item = CartItems.Where(c => c.ProductId == productId).FirstOrDefault();
        if (item == null) return;

        item.Quantity -= quantity;
        if (item.Quantity == 0)
        {
            CartItems.Remove(item);
        }
    }

}

public class CartItem
{
   public int CartItemId { get; set; }
   public int ProductId { get; set; }
   public Product Product { get; set; } = null!;
    public int CartId { get; set; }
   public int Quantity { get; set; }


   public decimal Price { get; set; }
   public string? ProductName { get; set; }
}

