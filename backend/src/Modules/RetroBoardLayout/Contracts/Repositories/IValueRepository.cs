using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;

public interface IValueRepository
{
    Task<Value?> GetByIdAsync(int id);
    Task<List<Value>> GetByCategoryIdAsync(int categoryId);
    Task AddAsync(Value value);
    void Update(Value value);
    void Delete(Value value);
    Task SaveChangesAsync();
}
