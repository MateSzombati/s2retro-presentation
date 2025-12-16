using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Columns;

namespace S2Retro.Modules.RetroBoardLayout.Application.DTOs.Layouts;

public record LayoutCreateDto(
    string Name,
    List<ColumnCreateDto> Columns
);
