using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoardColumn.Application.Services;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;

namespace S2Retro.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ColumnController : ControllerBase
{
    private readonly ColumnService _service;

    public ColumnController(ColumnService service)
    {
        _service = service;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ReadColumnDto>> GetById(int id)
    {
        var column = await _service.GetByIdAsync(id);
        if (column == null) return NotFound();
        return Ok(column);
    }

    [HttpPost]
    public async Task<ActionResult<ReadColumnDto>> Create(CreateColumnDto dto)
    {
        var column = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = column.Id }, column);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateColumnDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
