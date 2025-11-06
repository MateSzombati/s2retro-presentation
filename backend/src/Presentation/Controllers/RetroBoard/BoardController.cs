using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoard.Application.DTOs.Boards;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers.RetroBoard;

[ApiController]
[Route("api/[controller]")]
public class BoardController(IBoardService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BoardReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var boards = await service.GetAllAsync(cancellationToken);
        return Ok(boards);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BoardReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var board = await service.GetByIdAsync(id, cancellationToken);
        return board is null ? NotFound() : Ok(board);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] BoardCreateDto dto, CancellationToken cancellationToken)
    {
        var boardId = await service.CreateAsync(dto, cancellationToken);
        return Ok(boardId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] BoardUpdateDto dto, CancellationToken cancellationToken)
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
