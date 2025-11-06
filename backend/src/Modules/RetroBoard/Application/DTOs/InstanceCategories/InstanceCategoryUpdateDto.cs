using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;

public record InstanceCategoryUpdateDto(
    Guid Id,
    string Name,
    List<InstanceCategoryValueUpdateDto> Values
);
