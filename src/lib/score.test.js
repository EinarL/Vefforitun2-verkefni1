import { describe, expect, it } from '@jest/globals';
import { calculateStandings } from './score';

describe('calculateStandings', () => {

  const gamedays = [{
    date: '2024-01-30T15:20:53.955Z',
    games: [{
      home: {
        name: 'Óhemjurnar',
        score: 1
      },
      away: {
        name: 'Sigurliðið',
        score: 0
    }},
    {
      home: {
        name: 'Risaeðlurnar',
        score: 2
      },
      away: {
        name: 'Vinningshópurinn',
        score: 4
      }}

  ]},
  {
    date: '2024-02-19T15:20:53.955Z',
    games: [{
      home: {
        name: 'Risaeðlurnar',
        score: 1
      },
      away: {
        name: 'Óhemjurnar',
        score: 2
    }},
    {
      home: {
        name: 'Sigurliðið',
        score: 1
      },
      away: {
        name: 'Ósigrandi skotfólkið',
        score: 1
      }},
      {
        home: {
          name: 'Óhemjurnar',
          score: 2
        },
        away: {
          name: 'Vinningshópurinn',
          score: 2
        }}
  ]}];

  const standings = calculateStandings(gamedays)

  it('returns a list of teams with their scores', () => {
    expect(standings).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        score: expect.any(Number)
      })
    ]));
  });

  it('sorts the list by score in descending order', () => {
    for(let i = 0; i < standings.length - 1; i++){
      expect(standings[i].score).toBeGreaterThanOrEqual(standings[i+1].score);
    }
  });

  it('gives the correct list', async () => {
    expect(standings).toStrictEqual([
      { name: 'Óhemjurnar', score: 7 },
      { name: 'Vinningshópurinn', score: 4 },
      { name: 'Sigurliðið', score: 1 },
      { name: 'Ósigrandi skotfólkið', score: 1 },
      { name: 'Risaeðlurnar', score: 0 }
    ]);
  });

});
