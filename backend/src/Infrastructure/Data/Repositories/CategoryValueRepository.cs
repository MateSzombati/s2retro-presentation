using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class CategoryValueRepository(S2RetroDbContext db) : Repository<CategoryValue>(db), ICategoryValueRepository
{
    public override async Task<IEnumerable<CategoryValue>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.CategoryValues
            .Include(v => v.Category)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<CategoryValue?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.CategoryValues
            .Include(v => v.Category)
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
}
