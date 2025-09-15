using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;

public interface IColumnRepository
{
    Task<Column?> GetByIdAsync(int id);
    Task<List<Column>> GetByLayoutIdAsync(int layoutId);
    Task AddAsync(Column column);
    void Update(Column column);
    void Delete(Column column);
    Task SaveChangesAsync();
}
