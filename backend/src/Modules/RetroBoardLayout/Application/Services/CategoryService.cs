using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Categories;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Services;

public class CategoryService(ICategoryRepository categoryRepository, IMapper mapper) : ICategoryService
{
    public async Task<IEnumerable<CategoryReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var categories = await categoryRepository.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<CategoryReadDto>>(categories);
    }

    public async Task<CategoryReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var category = await categoryRepository.GetByIdAsync(id, cancellationToken);
        return mapper.Map<CategoryReadDto?>(category);
    }

    public async Task<Guid> CreateAsync(CategoryCreateDto dto, CancellationToken cancellationToken = default)
    {
        var category = mapper.Map<Category>(dto);
        await categoryRepository.AddAsync(category, cancellationToken);
        return category.Id;
    }

    public async Task UpdateAsync(CategoryUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var category = mapper.Map<Category>(dto);
        await categoryRepository.UpdateAsync(category, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await categoryRepository.DeleteAsync(id, cancellationToken);
    }
}
