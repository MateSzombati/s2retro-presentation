using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Mapping;

public class InstanceCategoryMappingProfile : Profile
{
    public InstanceCategoryMappingProfile()
    {
        CreateMap<InstanceCategory, InstanceCategoryReadDto>();
        CreateMap<InstanceCategoryCreateDto, InstanceCategory>();
        CreateMap<InstanceCategoryUpdateDto, InstanceCategory>();
    }
}
