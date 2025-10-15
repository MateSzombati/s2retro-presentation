using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;

public interface IValueRepository
{
    Task<CategoryValue?> GetByIdAsync(int id);
    Task<List<CategoryValue>> GetByCategoryIdAsync(int categoryId);
    Task AddAsync(CategoryValue value);
    void Update(CategoryValue value);
    void Delete(CategoryValue value);
    Task SaveChangesAsync();
}
