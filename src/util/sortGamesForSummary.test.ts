import { sortGamesForSummary } from "./sortGamesForSummary";
const games = [
  {
    id: "c533bb11-2fb3-448b-b22f-a11133610149",
    awayTeam: { name: "Belgium", score: 10 },
    homeTeam: { name: "Brazil", score: 2 },
    incrementalId: 4,
  },
  {
    id: "b8e39fc8-d8a1-4718-a275-2c48c1a805dd",
    awayTeam: { name: "Belgium", score: 8 },
    homeTeam: { name: "Brazil", score: 4 },
    incrementalId: 5,
  },

  {
    id: "0237d17e-6245-4f42-ad9a-f12af775c490",
    awayTeam: { name: "Argentina", score: 0 },
    homeTeam: { name: "Australia", score: 5 },
    incrementalId: 1,
  },
  {
    id: "cfcf2d8d-43e8-4fe4-91e0-2acdf30e69fb",
    awayTeam: { name: "Egypt", score: 3 },
    homeTeam: { name: "England", score: 1 },
    incrementalId: 6,
  },
  {
    id: "6ce3694d-ca1c-472f-b278-19bdd98d6d38",
    awayTeam: { name: "Croatia", score: 6 },
    homeTeam: { name: "Denmark", score: 6 },
    incrementalId: 3,
  },
  {
    id: "a0a95850-d957-4640-9a3b-3f3ee2db88e2",
    awayTeam: { name: "Colombia", score: 2 },
    homeTeam: { name: "Costa Rica", score: 2 },
    incrementalId: 2,
  },
];

test("check if the games are correctly sorted", () => {
  const correctlySortedGames = [
    {
      id: "b8e39fc8-d8a1-4718-a275-2c48c1a805dd",
      awayTeam: { name: "Belgium", score: 8 },
      homeTeam: { name: "Brazil", score: 4 },
      incrementalId: 5,
    },
    {
      id: "c533bb11-2fb3-448b-b22f-a11133610149",
      awayTeam: { name: "Belgium", score: 10 },
      homeTeam: { name: "Brazil", score: 2 },
      incrementalId: 4,
    },
    {
      id: "6ce3694d-ca1c-472f-b278-19bdd98d6d38",
      awayTeam: { name: "Croatia", score: 6 },
      homeTeam: { name: "Denmark", score: 6 },
      incrementalId: 3,
    },
    {
      id: "0237d17e-6245-4f42-ad9a-f12af775c490",
      awayTeam: { name: "Argentina", score: 0 },
      homeTeam: { name: "Australia", score: 5 },
      incrementalId: 1,
    },
    {
      id: "cfcf2d8d-43e8-4fe4-91e0-2acdf30e69fb",
      awayTeam: { name: "Egypt", score: 3 },
      homeTeam: { name: "England", score: 1 },
      incrementalId: 6,
    },
    {
      id: "a0a95850-d957-4640-9a3b-3f3ee2db88e2",
      awayTeam: { name: "Colombia", score: 2 },
      homeTeam: { name: "Costa Rica", score: 2 },
      incrementalId: 2,
    },
  ];
  const sortedGames = sortGamesForSummary(games);
  expect(sortedGames).toEqual(correctlySortedGames);
});
