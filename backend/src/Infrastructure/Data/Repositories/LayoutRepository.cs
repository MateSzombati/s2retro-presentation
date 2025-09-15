using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class LayoutRepository : ILayoutRepository
{
    private readonly S2RetroDbContext _db;

    public LayoutRepository(S2RetroDbContext db) => _db = db;

    public async Task AddAsync(Layout layout) => await _db.Layouts.AddAsync(layout);

    public void Delete(Layout layout) => _db.Layouts.Remove(layout);

    public async Task<List<Layout>> GetAllAsync() =>
        await _db.Layouts
            .Include(l => l.Columns)
            .ToListAsync();

    public async Task<Layout?> GetByIdAsync(int id) =>
        await _db.Layouts
            .Include(l => l.Columns)
                .ThenInclude(c => c.Category)
                    .ThenInclude(cat => cat.Values)
            .FirstOrDefaultAsync(l => l.Id == id);

    public async Task SaveChangesAsync() => await _db.SaveChangesAsync();

    public void Update(Layout layout) => _db.Layouts.Update(layout);
}
