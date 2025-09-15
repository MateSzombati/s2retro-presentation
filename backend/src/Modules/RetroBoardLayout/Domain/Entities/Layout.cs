namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class Layout
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool IsArchieved { get; set; }
    public ICollection<Column> Columns { get; set; } = new List<Column>();
}
