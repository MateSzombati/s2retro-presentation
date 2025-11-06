using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class InstanceCategoryValueRepository(S2RetroDbContext db) : Repository<InstanceCategoryValue>(db), IInstanceCategoryValueRepository
{
    public override async Task<IEnumerable<InstanceCategoryValue>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.InstanceCategoryValues
            .Include(v => v.Category)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<InstanceCategoryValue?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.InstanceCategoryValues
            .Include(v => v.Category)
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
}
