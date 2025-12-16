using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Layouts;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Services;

public class LayoutService(ILayoutRepository repo, IMapper mapper) : ILayoutService
{
    public async Task<IEnumerable<LayoutReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var layouts = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<LayoutReadDto>>(layouts);
    }

    public async Task<LayoutReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var layout = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<LayoutReadDto?>(layout);
    }

    public async Task<Guid> CreateAsync(LayoutCreateDto dto, CancellationToken cancellationToken = default)
    {
        var layout = mapper.Map<Layout>(dto);
        await repo.AddAsync(layout, cancellationToken);
        return layout.Id;
    }

    public async Task UpdateAsync(LayoutUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var layout = mapper.Map<Layout>(dto);
        await repo.UpdateAsync(layout, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
