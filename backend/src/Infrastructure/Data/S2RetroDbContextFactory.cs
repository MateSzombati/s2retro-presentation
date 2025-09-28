using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace S2Retro.Infrastructure.Data;

public class S2RetroDbContextFactory : IDesignTimeDbContextFactory<S2RetroDbContext>
{
    public S2RetroDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<S2RetroDbContext>();

        optionsBuilder.UseMySql("Server=127.0.0.1;Port=3306;Database=s2retro-database;User=root;Password=L^!&eWq5wGbD5!7w3AKX*Lhxk77kW!wZ2^5!6Pf73^!3tVK2N@;", new MySqlServerVersion(new Version(8, 4, 0)));

        return new S2RetroDbContext(optionsBuilder.Options);
    }
}
