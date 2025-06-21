namespace PanicSpiral.API.Model.Entities;

public class DifficultySettings
{
    public int Id { get; set; }

    // using float because it occupies the least space and we don't need more precision
    // see: https://stackoverflow.com/a/16984608 
    public float BreakdownRate { get; set; }
}