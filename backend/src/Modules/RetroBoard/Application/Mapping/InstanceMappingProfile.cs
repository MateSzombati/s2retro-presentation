using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.Instances;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Mapping;

public class InstanceMappingProfile : Profile
{
    public InstanceMappingProfile()
    {
        CreateMap<Instance, InstanceReadDto>();
        CreateMap<InstanceCreateDto, Instance>();
        CreateMap<InstanceUpdateDto, Instance>();
    }
}
