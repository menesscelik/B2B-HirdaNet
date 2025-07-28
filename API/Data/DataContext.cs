using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    public DbSet<Cart> Carts => Set<Cart>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product{ Id=1, Name="Iphone15",Description="Telefon aciklamasi", ImageUrl="1.jpg",IsActive=true, Price = 50000, Stock = 200},
                new Product{ Id=2, Name="Iphone16",Description="Telefon aciklamasi", ImageUrl="2.jpg",IsActive=true, Price = 60000, Stock = 100},
                new Product{ Id=3, Name="Iphone17",Description="Telefon aciklamasi", ImageUrl="3.jpg",IsActive=false, Price = 70000, Stock = 234},
                new Product{ Id=4, Name="Iphone17 Pro",Description="Telefon aciklamasi", ImageUrl="4.jpg",IsActive=true, Price = 150000, Stock = 23},
            }

        );
    }

}