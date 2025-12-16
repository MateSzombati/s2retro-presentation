using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class CategoryRepository(S2RetroDbContext db) : Repository<Category>(db), ICategoryRepository
{
    public override async Task<IEnumerable<Category>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.Categories
            .Include(c => c.Values)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<Category?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.Categories
            .Include(c => c.Values)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
}
