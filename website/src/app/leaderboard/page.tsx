interface ScoreboardEntry {
  date: Date;
  name: string;
  score: number;
}

export default async function Page() {
  let scoreboard: ScoreboardEntry[] = [];
  try {
    const data = await fetch("http://api:8080/leaderboard");
    const json: { date: number; name: string; score: number }[] =
      await data.json();

    scoreboard = json.map(({ date, name, score }) => ({
      date: new Date(date),
      name,
      score,
    }));
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="max-w-[400px] m-auto">
      <table className="w-full text-center">
        <thead className="text-lg">
          <tr>
            <th className="pb-4">Rank</th>
            <th className="pb-4">Name</th>
            <th className="pb-4">Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((entry, index) => (
            <tr key={index}>
              <td className="pb-2">{index + 1}</td>
              <td className="pb-2">{entry.name}</td>
              <td className="pb-2">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
