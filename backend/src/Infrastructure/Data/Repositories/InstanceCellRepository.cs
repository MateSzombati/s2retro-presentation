using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class InstanceCellRepository(S2RetroDbContext db) : Repository<InstanceCell>(db), IInstanceCellRepository
{
    public override async Task<IEnumerable<InstanceCell>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.InstanceCells
            .Include(c => c.Row)
            .Include(c => c.CategoryValue)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<InstanceCell?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.InstanceCells
            .Include(c => c.Row)
            .Include(c => c.CategoryValue)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
}
