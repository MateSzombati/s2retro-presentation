using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Services;

public class InstanceCategoryService(IInstanceCategoryRepository repo, IMapper mapper) : IInstanceCategoryService
{
    public async Task<IEnumerable<InstanceCategoryReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var categories = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<InstanceCategoryReadDto>>(categories);
    }

    public async Task<InstanceCategoryReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var category = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<InstanceCategoryReadDto?>(category);
    }

    public async Task<Guid> CreateAsync(InstanceCategoryCreateDto dto, CancellationToken cancellationToken = default)
    {
        var category = mapper.Map<InstanceCategory>(dto);
        await repo.AddAsync(category, cancellationToken);
        return category.Id;
    }

    public async Task UpdateAsync(InstanceCategoryUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var category = mapper.Map<InstanceCategory>(dto);
        await repo.UpdateAsync(category, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
