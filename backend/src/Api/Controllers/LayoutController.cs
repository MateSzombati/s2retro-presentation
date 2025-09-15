using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoardLayout.Application.Services;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Layouts;

namespace S2Retro.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LayoutController : ControllerBase
{
    private readonly LayoutService _service;

    public LayoutController(LayoutService service)
    {
        _service = service;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ReadLayoutDto>> GetById(int id)
    {
        var layout = await _service.GetByIdAsync(id);
        if (layout == null) return NotFound();
        return Ok(layout);
    }

    [HttpGet]
    public async Task<ActionResult<List<ReadLayoutDto>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpPost]
    public async Task<ActionResult<ReadLayoutDto>> Create(CreateLayoutDto dto)
    {
        var layout = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = layout.Id }, layout);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateLayoutDto dto)
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
