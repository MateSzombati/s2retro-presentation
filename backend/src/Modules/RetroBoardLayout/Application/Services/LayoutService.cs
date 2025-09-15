using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Layouts;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Services;

public class LayoutService
{
    private readonly ILayoutRepository _repo;
    private readonly IMapper _mapper;

    public LayoutService(ILayoutRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<ReadLayoutDto?> GetByIdAsync(int id) =>
        _mapper.Map<ReadLayoutDto>(await _repo.GetByIdAsync(id));

    public async Task<List<ReadLayoutDto>> GetAllAsync() =>
        _mapper.Map<List<ReadLayoutDto>>(await _repo.GetAllAsync());

    public async Task<ReadLayoutDto> CreateAsync(CreateLayoutDto dto)
    {
        var layout = _mapper.Map<Layout>(dto);
        await _repo.AddAsync(layout);
        await _repo.SaveChangesAsync();
        return _mapper.Map<ReadLayoutDto>(layout);
    }

    public async Task UpdateAsync(int id, UpdateLayoutDto dto)
    {
        var layout = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Layout not found");
        _mapper.Map(dto, layout);
        _repo.Update(layout);
        await _repo.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var layout = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Layout not found");
        _repo.Delete(layout);
        await _repo.SaveChangesAsync();
    }
}
