using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class InstanceRepository(S2RetroDbContext db) : Repository<Instance>(db), IInstanceRepository
{
    public override async Task<IEnumerable<Instance>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.Instances
            .Include(i => i.Columns)
            .Include(i => i.Rows)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<Instance?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.Instances
            .Include(i => i.Columns)
            .Include(i => i.Rows)
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == id, cancellationToken);
}
