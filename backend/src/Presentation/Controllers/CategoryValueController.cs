using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.CategoryValues;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryValueController(ICategoryValueService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryValueReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var categoryValues = await service.GetAllAsync(cancellationToken);
        return Ok(categoryValues);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CategoryValueReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var categoryValue = await service.GetByIdAsync(id, cancellationToken);
        return categoryValue is null ? NotFound() : Ok(categoryValue);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] CategoryValueCreateDto dto, CancellationToken cancellationToken)
    {
        var categoryValueId = await service.CreateAsync(dto, cancellationToken);
        return Ok(categoryValueId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] CategoryValueUpdateDto dto, CancellationToken cancellationToken)
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
