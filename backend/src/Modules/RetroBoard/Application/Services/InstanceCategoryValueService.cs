using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Services;

public class InstanceCategoryValueService(IInstanceCategoryValueRepository repo, IMapper mapper) : IInstanceCategoryValueService
{
    public async Task<IEnumerable<InstanceCategoryValueReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var values = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<InstanceCategoryValueReadDto>>(values);
    }

    public async Task<InstanceCategoryValueReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var value = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<InstanceCategoryValueReadDto?>(value);
    }

    public async Task<Guid> CreateAsync(InstanceCategoryValueCreateDto dto, CancellationToken cancellationToken = default)
    {
        var value = mapper.Map<InstanceCategoryValue>(dto);
        await repo.AddAsync(value, cancellationToken);
        return value.Id;
    }

    public async Task UpdateAsync(InstanceCategoryValueUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var value = mapper.Map<InstanceCategoryValue>(dto);
        await repo.UpdateAsync(value, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
