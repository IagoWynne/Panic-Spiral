using Microsoft.AspNetCore.Http.HttpResults;

namespace PanicSpiral.API.Leaderboard;

public static class LeaderboardEndpoints
{
    private const string BaseUrl = "/leaderboard";

    public static void MapLeaderboardEndpoints(this WebApplication app)
    {
        var apiGroup = app.MapGroup(BaseUrl);

        apiGroup.MapGet("/", GetLeaderboard);
    }

    private static string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static Results<Ok<List<LeaderboardEntryDTO>>, ProblemHttpResult> GetLeaderboard()
    {
        return TypedResults.Ok(Enumerable.Range(1, 10)
            .Select((index) =>
                new LeaderboardEntryDTO(
                    DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
                    $"{alphabet[Random.Shared.Next(0, 25)]}{alphabet[Random.Shared.Next(0, 25)]}{alphabet[Random.Shared.Next(0, 25)]}",
                    Random.Shared.Next(200, 500)))
            .OrderByDescending(record => record.Score)
            .ToList());
    }
}