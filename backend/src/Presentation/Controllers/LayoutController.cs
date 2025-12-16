using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Layouts;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LayoutController(ILayoutService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LayoutReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var layouts = await service.GetAllAsync(cancellationToken);
        return Ok(layouts);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<LayoutReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var layout = await service.GetByIdAsync(id, cancellationToken);
        return layout is null ? NotFound() : Ok(layout);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] LayoutCreateDto dto, CancellationToken cancellationToken)
    {
        var layoutId = await service.CreateAsync(dto, cancellationToken);
        return Ok(layoutId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] LayoutUpdateDto dto, CancellationToken cancellationToken)
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
