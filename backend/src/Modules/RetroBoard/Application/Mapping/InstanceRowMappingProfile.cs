using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Mapping;

public class InstanceRowMappingProfile : Profile
{
    public InstanceRowMappingProfile()
    {
        CreateMap<InstanceRow, InstanceRowReadDto>();
        CreateMap<InstanceRowCreateDto, InstanceRow>();
        CreateMap<InstanceRowUpdateDto, InstanceRow>();
    }
}
