using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class ColumnRepository(S2RetroDbContext db) : Repository<Column>(db), IColumnRepository
{
    public override async Task<IEnumerable<Column>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.Columns
            .Include(c => c.Layout)
            .Include(c => c.Category)
                .ThenInclude(cat => cat!.Values)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<Column?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.Columns
            .Include(c => c.Layout)
            .Include(c => c.Category)
                .ThenInclude(cat => cat!.Values)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
}
