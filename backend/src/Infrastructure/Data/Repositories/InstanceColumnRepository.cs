using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class InstanceColumnRepository(S2RetroDbContext db) : Repository<InstanceColumn>(db), IInstanceColumnRepository
{
    public override async Task<IEnumerable<InstanceColumn>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.InstanceColumns
            .Include(c => c.Instance)
            .Include(c => c.Category)
                .ThenInclude(cat => cat!.Values)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<InstanceColumn?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.InstanceColumns
            .Include(c => c.Instance)
            .Include(c => c.Category)
                .ThenInclude(cat => cat!.Values)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
}
