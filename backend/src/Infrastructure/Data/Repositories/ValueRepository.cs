using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class ValueRepository : IValueRepository
{
    private readonly S2RetroDbContext _db;

    public ValueRepository(S2RetroDbContext db) => _db = db;

    public async Task<Value?> GetByIdAsync(int id) =>
        await _db.Values.FirstOrDefaultAsync(v => v.Id == id);

    public async Task<List<Value>> GetByCategoryIdAsync(int categoryId) =>
        await _db.Values.Where(v => v.CategoryId == categoryId).ToListAsync();

    public async Task AddAsync(Value value) => await _db.Values.AddAsync(value);

    public void Update(Value value) => _db.Values.Update(value);

    public void Delete(Value value) => _db.Values.Remove(value);

    public async Task SaveChangesAsync() => await _db.SaveChangesAsync();
}
