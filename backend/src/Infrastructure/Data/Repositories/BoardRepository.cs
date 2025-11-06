using Microsoft.EntityFrameworkCore;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Infrastructure.Data.Repositories;

public class BoardRepository(S2RetroDbContext db) : Repository<Board>(db), IBoardRepository
{
    public override async Task<IEnumerable<Board>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.Boards
            .Include(b => b.Instances)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public override async Task<Board?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.Boards
            .Include(b => b.Instances)
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
}
