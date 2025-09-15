using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class ColumnRepository : IColumnRepository
{
    private readonly S2RetroDbContext _db;

    public ColumnRepository(S2RetroDbContext db) => _db = db;

    public async Task<Column?> GetByIdAsync(int id) =>
        await _db.Columns.Include(c => c.Category).FirstOrDefaultAsync(c => c.Id == id);

    public async Task<List<Column>> GetByLayoutIdAsync(int layoutId) =>
        await _db.Columns.Where(c => c.LayoutId == layoutId).ToListAsync();

    public async Task AddAsync(Column column) => await _db.Columns.AddAsync(column);

    public void Update(Column column) => _db.Columns.Update(column);

    public void Delete(Column column) => _db.Columns.Remove(column);

    public async Task SaveChangesAsync() => await _db.SaveChangesAsync();
}
