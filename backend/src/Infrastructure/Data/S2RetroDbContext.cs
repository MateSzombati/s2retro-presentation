<<<<<<< HEAD
﻿namespace S2Retro.Infrastructure.Data;

internal class S2RetroDbContext
{
=======
﻿using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data;

public class S2RetroDbContext(DbContextOptions<S2RetroDbContext> options) : DbContext(options)
{
    public DbSet<Layout> Layouts => Set<Layout>();
    public DbSet<Column> Columns => Set<Column>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<CategoryValue> CategoryValues => Set<CategoryValue>();

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
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Category>()
            .HasMany(c => c.Values)
            .WithOne(v => v.Category)
            .HasForeignKey(v => v.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
>>>>>>> main
}
