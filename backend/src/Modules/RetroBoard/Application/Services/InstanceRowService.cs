using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Services;

public class InstanceRowService(IInstanceRowRepository repo, IMapper mapper) : IInstanceRowService
{
    public async Task<IEnumerable<InstanceRowReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var rows = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<InstanceRowReadDto>>(rows);
    }

    public async Task<InstanceRowReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var row = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<InstanceRowReadDto?>(row);
    }

    public async Task<Guid> CreateAsync(InstanceRowCreateDto dto, CancellationToken cancellationToken = default)
    {
        var row = mapper.Map<InstanceRow>(dto);
        await repo.AddAsync(row, cancellationToken);
        return row.Id;
    }

    public async Task UpdateAsync(InstanceRowUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var row = mapper.Map<InstanceRow>(dto);
        await repo.UpdateAsync(row, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
