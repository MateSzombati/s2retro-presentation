using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.CategoryValues;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Mapping;

public class CategoryValueMappingProfile : Profile
{
    public CategoryValueMappingProfile()
    {
        CreateMap<CategoryValue, CategoryValueReadDto>();
        CreateMap<CategoryValueCreateDto, CategoryValue>();
        CreateMap<CategoryValueUpdateDto, CategoryValue>();
    }
}
