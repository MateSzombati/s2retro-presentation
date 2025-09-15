using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;

public interface ILayoutRepository
{
    Task<Layout?> GetByIdAsync(int id);
    Task<List<Layout>> GetAllAsync();
    Task AddAsync(Layout layout);
    void Update(Layout layout);
    void Delete(Layout layout);
    Task SaveChangesAsync();
}
