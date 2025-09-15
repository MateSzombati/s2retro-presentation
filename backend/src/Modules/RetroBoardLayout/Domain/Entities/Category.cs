namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Value> Values { get; set; } = new List<Value>();
}
