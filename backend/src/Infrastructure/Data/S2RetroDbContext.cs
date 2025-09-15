using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data;

public class S2RetroDbContext : DbContext
{
    public S2RetroDbContext(DbContextOptions<S2RetroDbContext> options) : base(options) { }

    public DbSet<Layout> Layouts { get; set; } = null!;
    public DbSet<Column> Columns { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Value> Values { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Layout>()
            .HasMany(l => l.Columns)
            .WithOne(c => c.Layout)
            .HasForeignKey(c => c.LayoutId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Column>()
            .HasOne(c => c.Category)
            .WithMany()
            .HasForeignKey(c => c.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Category>()
            .HasMany(c => c.Values)
            .WithOne(v => v.Category)
            .HasForeignKey(v => v.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
