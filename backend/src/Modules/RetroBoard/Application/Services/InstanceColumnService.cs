using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceColumns;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Services;

public class InstanceColumnService(IInstanceColumnRepository repo, IMapper mapper) : IInstanceColumnService
{
    public async Task<IEnumerable<InstanceColumnReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var columns = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<InstanceColumnReadDto>>(columns);
    }

    public async Task<InstanceColumnReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var column = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<InstanceColumnReadDto?>(column);
    }

    public async Task<Guid> CreateAsync(InstanceColumnCreateDto dto, CancellationToken cancellationToken = default)
    {
        var column = mapper.Map<InstanceColumn>(dto);
        await repo.AddAsync(column, cancellationToken);
        return column.Id;
    }

    public async Task UpdateAsync(InstanceColumnUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var column = mapper.Map<InstanceColumn>(dto);
        await repo.UpdateAsync(column, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
