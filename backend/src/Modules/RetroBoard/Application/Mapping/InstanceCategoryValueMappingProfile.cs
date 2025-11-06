using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Mapping;

public class InstanceCategoryValueMappingProfile : Profile
{
    public InstanceCategoryValueMappingProfile()
    {
        CreateMap<InstanceCategoryValue, InstanceCategoryValueReadDto>();
        CreateMap<InstanceCategoryValueCreateDto, InstanceCategoryValue>();
        CreateMap<InstanceCategoryValueUpdateDto, InstanceCategoryValue>();
    }
}
