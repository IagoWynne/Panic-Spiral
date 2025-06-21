using Microsoft.AspNetCore.Http.HttpResults;
using PanicSpiral.API.Game.DTOs;
using PanicSpiral.API.Model.Database;

namespace PanicSpiral.API.Game;

public static class GameEndpoints
{
    private const string BaseUrl = "/game";

    public static void MapGameEndpoints(this WebApplication app)
    {
        var apiGroup = app.MapGroup(BaseUrl);

        apiGroup.MapGet("/difficulty-settings", GetDifficultySettings);
    }

    public static Results<Ok<List<DifficultySettingsDTO>>, ProblemHttpResult> GetDifficultySettings(PanicSpiralContext context)
    {
        return TypedResults.Ok(context.DifficultySettings.Select(s => new DifficultySettingsDTO(s.Id, s.BreakdownRate)).ToList());
    }
}