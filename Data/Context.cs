using Data.Models;
using Microsoft.EntityFrameworkCore;

public class Context : DbContext
{
    public Context() { }

    public Context(DbContextOptions<Context> options)
        : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public virtual DbSet<Contact> contacts { get; set; } = null!;
}