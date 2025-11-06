using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Services;

public class InstanceCellService(IInstanceCellRepository repo, IMapper mapper) : IInstanceCellService
{
    public async Task<IEnumerable<InstanceCellReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var cells = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<InstanceCellReadDto>>(cells);
    }

    public async Task<InstanceCellReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var cell = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<InstanceCellReadDto?>(cell);
    }

    public async Task<Guid> CreateAsync(InstanceCellCreateDto dto, CancellationToken cancellationToken = default)
    {
        var cell = mapper.Map<InstanceCell>(dto);
        await repo.AddAsync(cell, cancellationToken);
        return cell.Id;
    }

    public async Task UpdateAsync(InstanceCellUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var cell = mapper.Map<InstanceCell>(dto);
        await repo.UpdateAsync(cell, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
