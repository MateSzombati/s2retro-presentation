using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers.RetroBoard;

[ApiController]
[Route("api/[controller]")]
public class InstanceCategoryValueController(IInstanceCategoryValueService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstanceCategoryValueReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var values = await service.GetAllAsync(cancellationToken);
        return Ok(values);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InstanceCategoryValueReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var value = await service.GetByIdAsync(id, cancellationToken);
        return value is null ? NotFound() : Ok(value);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] InstanceCategoryValueCreateDto dto, CancellationToken cancellationToken)
    {
        var valueId = await service.CreateAsync(dto, cancellationToken);
        return Ok(valueId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] InstanceCategoryValueUpdateDto dto, CancellationToken cancellationToken)
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
