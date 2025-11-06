using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.Instances;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Services;

public class InstanceService(IInstanceRepository repo, IMapper mapper) : IInstanceService
{
    public async Task<IEnumerable<InstanceReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var instances = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<InstanceReadDto>>(instances);
    }

    public async Task<InstanceReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var instance = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<InstanceReadDto?>(instance);
    }

    public async Task<Guid> CreateAsync(InstanceCreateDto dto, CancellationToken cancellationToken = default)
    {
        var instance = mapper.Map<Instance>(dto);
        await repo.AddAsync(instance, cancellationToken);
        return instance.Id;
    }

    public async Task UpdateAsync(InstanceUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var instance = mapper.Map<Instance>(dto);
        await repo.UpdateAsync(instance, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
