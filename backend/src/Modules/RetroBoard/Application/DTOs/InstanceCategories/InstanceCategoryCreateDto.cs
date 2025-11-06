using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;

public record InstanceCategoryCreateDto(
    string Name,
    List<InstanceCategoryValueCreateDto> Values
);
