using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers.RetroBoard;

[ApiController]
[Route("api/[controller]")]
public class InstanceCellController(IInstanceCellService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstanceCellReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var cells = await service.GetAllAsync(cancellationToken);
        return Ok(cells);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InstanceCellReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var cell = await service.GetByIdAsync(id, cancellationToken);
        return cell is null ? NotFound() : Ok(cell);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] InstanceCellCreateDto dto, CancellationToken cancellationToken)
    {
        var cellId = await service.CreateAsync(dto, cancellationToken);
        return Ok(cellId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] InstanceCellUpdateDto dto, CancellationToken cancellationToken)
    {
        await service.UpdateAsync(dto, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        await service.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}
