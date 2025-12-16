using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class LayoutRepository(S2RetroDbContext db) : Repository<Layout>(db), ILayoutRepository
{
    public override async Task<IEnumerable<Layout>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.Layouts
            .Include(l => l.Columns)
                .ThenInclude(c => c.Category)
                    .ThenInclude(cat => cat!.Values)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<Layout?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.Layouts
            .Include(l => l.Columns)
                .ThenInclude(c => c.Category)
                    .ThenInclude(cat => cat!.Values)
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == id, cancellationToken);
}
