using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.CategoryValues;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Services;

public class CategoryValueService(ICategoryValueRepository categoryValueRepository, IMapper mapper) : ICategoryValueService
{
    public async Task<IEnumerable<CategoryValueReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var values = await categoryValueRepository.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<CategoryValueReadDto>>(values);
    }

    public async Task<CategoryValueReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var value = await categoryValueRepository.GetByIdAsync(id, cancellationToken);
        return mapper.Map<CategoryValueReadDto?>(value);
    }

    public async Task<Guid> CreateAsync(CategoryValueCreateDto dto, CancellationToken cancellationToken = default)
    {
        var value = mapper.Map<CategoryValue>(dto);
        await categoryValueRepository.AddAsync(value, cancellationToken);
        return value.Id;
    }

    public async Task UpdateAsync(CategoryValueUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var value = mapper.Map<CategoryValue>(dto);
        await categoryValueRepository.UpdateAsync(value, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await categoryValueRepository.DeleteAsync(id, cancellationToken);
    }
}
