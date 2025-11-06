using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceColumns;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Mapping;

public class InstanceColumnMappingProfile : Profile
{
    public InstanceColumnMappingProfile()
    {
        CreateMap<InstanceColumn, InstanceColumnReadDto>();
        CreateMap<InstanceColumnCreateDto, InstanceColumn>();
        CreateMap<InstanceColumnUpdateDto, InstanceColumn>();
    }
}
