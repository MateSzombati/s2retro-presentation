using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Mapping;

public class InstanceCellMappingProfile : Profile
{
    public InstanceCellMappingProfile()
    {
        CreateMap<InstanceCell, InstanceCellReadDto>();
        CreateMap<InstanceCellCreateDto, InstanceCell>();
        CreateMap<InstanceCellUpdateDto, InstanceCell>();
    }
}
