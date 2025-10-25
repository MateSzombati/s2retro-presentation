using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Columns;

namespace S2Retro.Modules.RetroBoardLayout.Application.DTOs.Layouts;

public record LayoutUpdateDto(
    Guid Id,
    string Name,
    bool IsArchived,
    List<ColumnUpdateDto> Columns
);
