using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data;

public class S2RetroDbContext(DbContextOptions<S2RetroDbContext> options) : DbContext(options)
{
    public DbSet<Board> Boards => Set<Board>();
    public DbSet<Instance> Instances => Set<Instance>();
    public DbSet<InstanceColumn> InstanceColumns => Set<InstanceColumn>();
    public DbSet<InstanceRow> InstanceRows => Set<InstanceRow>();
    public DbSet<InstanceCell> InstanceCells => Set<InstanceCell>();
    public DbSet<InstanceCategory> InstanceCategories => Set<InstanceCategory>();
    public DbSet<InstanceCategoryValue> InstanceCategoryValues => Set<InstanceCategoryValue>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Board -> Instances (Cascade)
        modelBuilder.Entity<Board>()
            .HasMany(b => b.Instances)
            .WithOne(i => i.Board)
            .HasForeignKey(i => i.BoardId)
            .OnDelete(DeleteBehavior.Cascade);

        // Instance -> Columns (Cascade)
        modelBuilder.Entity<Instance>()
            .HasMany(i => i.Columns)
            .WithOne(c => c.Instance)
            .HasForeignKey(c => c.InstanceId)
            .OnDelete(DeleteBehavior.Cascade);

        // Instance -> Rows (Cascade)
        modelBuilder.Entity<Instance>()
            .HasMany(i => i.Rows)
            .WithOne(r => r.Instance)
            .HasForeignKey(r => r.InstanceId)
            .OnDelete(DeleteBehavior.Cascade);

        // InstanceRow -> InstanceCell (Cascade)
        modelBuilder.Entity<InstanceRow>()
            .HasMany(r => r.Cells)
            .WithOne(c => c.Row)
            .HasForeignKey(c => c.RowId)
            .OnDelete(DeleteBehavior.Cascade);

        // InstanceColumn -> InstanceCategory (SetNull)
        modelBuilder.Entity<InstanceColumn>()
            .HasOne(c => c.Category)
            .WithMany()
            .HasForeignKey(c => c.InstanceCategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        // InstanceCategory -> Values (Cascade)
        modelBuilder.Entity<InstanceCategory>()
            .HasMany(c => c.Values)
            .WithOne(v => v.Category)
            .HasForeignKey(v => v.InstanceCategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        // InstanceCell -> CategoryValue (SetNull)
        modelBuilder.Entity<InstanceCell>()
            .HasOne(c => c.CategoryValue)
            .WithMany()
            .HasForeignKey(c => c.InstanceCategoryValueId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
