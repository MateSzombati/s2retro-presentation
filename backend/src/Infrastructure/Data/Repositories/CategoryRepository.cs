using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly S2RetroDbContext _db;

    public CategoryRepository(S2RetroDbContext db) => _db = db;

    public async Task<Category?> GetByIdAsync(int id) =>
        await _db.Categories.Include(c => c.Values).FirstOrDefaultAsync(c => c.Id == id);

    public async Task<List<Category>> GetAllAsync() => await _db.Categories.ToListAsync();

    public async Task AddAsync(Category category) => await _db.Categories.AddAsync(category);

    public void Update(Category category) => _db.Categories.Update(category);

    public void Delete(Category category) => _db.Categories.Remove(category);

    public async Task SaveChangesAsync() => await _db.SaveChangesAsync();
}
