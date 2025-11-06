using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class InstanceCategoryRepository(S2RetroDbContext db) : Repository<InstanceCategory>(db), IInstanceCategoryRepository
{
    public override async Task<IEnumerable<InstanceCategory>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.InstanceCategories
            .Include(c => c.Values)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<InstanceCategory?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.InstanceCategories
            .Include(c => c.Values)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
}
