using Microsoft.EntityFrameworkCore;
using PanicSpiral.API.Model.Entities;

namespace PanicSpiral.API.Model.Database;

public interface IPanicSpiralContext
{
    public DbSet<DifficultySettings> DifficultySettings { get; set; }
}

public class PanicSpiralContext(DbContextOptions<PanicSpiralContext> options) : DbContext(options), IPanicSpiralContext
{
    public required DbSet<DifficultySettings> DifficultySettings { get; set; }
}