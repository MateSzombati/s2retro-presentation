using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class InstanceRowRepository(S2RetroDbContext db) : Repository<InstanceRow>(db), IInstanceRowRepository
{
    public override async Task<IEnumerable<InstanceRow>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.InstanceRows
            .Include(r => r.Instance)
            .Include(r => r.Cells)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<InstanceRow?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.InstanceRows
            .Include(r => r.Instance)
            .Include(r => r.Cells)
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
}
