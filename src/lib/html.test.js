import { describe, expect, it } from '@jest/globals';
import { gameTemplate, indexTemplate, standingsTemplate, template } from './html';

describe('html', () => {
  describe('template', () => {
    it('should generate a correct template', () => {
      expect(template('this is some sample content')).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Knattspyrnudeildin</title>
    <link rel="stylesheet" href="../public/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>this is some sample content</body>
</html>`);
    });
  });


  describe('indexTemplate', () => {
    it('should generate a correct index template', () => {
      expect(indexTemplate()).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Knattspyrnudeildin</title>
    <link rel="stylesheet" href="../public/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body><h2>Knattspyrnudeildin</h2>
  <p>Aðeins bestu leikir íslandssögunnar! ⚽</p>
  <p><a href="./leikir.html">Bestu leikirnir</a></p>
  <p><a href="./stada.html">Staðan</a></p>
  </body>
</html>`);
    });
  });


  describe('gameTemplate', () => {
    it('should genereate a correct game template', () => {
      const gamedays = [{
        date: '2024-01-30T15:20:53.955Z',
        games: [{
          home: {
            name: 'Óhemjurnar',
            score: 0
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
            name: 'Framherjarnir',
            score: 2
        }},
        {
          home: {
            name: 'Hraðaliðið',
            score: 1
          },
          away: {
            name: 'Ósigrandi skotfólkið',
            score: 1
          }}
      ]}];

      expect(gameTemplate(gamedays)).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Knattspyrnudeildin</title>
    <link rel="stylesheet" href="../public/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
  <div>
    <h2>Bestu leikirnir</h2>
    <table class="matches">
      <thead>
        <tr>
          <th class="date-head">Dagsetning</th>
          <th>Heimalið</th>
          <th></th>
          <th></th>
          <th></th>
          <th>Útilið</th>
        </tr>
      </thead>
      <tr class="small-screen">
      <td colspan="6" >
        <span>Dagsetning:</span> 30/01/2024 15:20:53
      </td>
    </tr>
    <tr class="match">
      <td class="no-border date">30/01/2024 15:20:53</td>
      <td>Óhemjurnar</td>
      <td class="yellow">0</td>
      <td class="no-border versus">VS</td>
      <td class="yellow">0</td>
      <td>Sigurliðið</td>
    </tr><tr class="small-screen">
      <td colspan="6" >
        <span>Dagsetning:</span> 30/01/2024 15:20:53
      </td>
    </tr>
    <tr class="match">
      <td class="no-border date">30/01/2024 15:20:53</td>
      <td>Risaeðlurnar</td>
      <td class="red">2</td>
      <td class="no-border versus">VS</td>
      <td class="green">4</td>
      <td>Vinningshópurinn</td>
    </tr><tr class="small-screen">
      <td colspan="6" >
        <span>Dagsetning:</span> 19/02/2024 15:20:53
      </td>
    </tr>
    <tr class="match">
      <td class="no-border date">19/02/2024 15:20:53</td>
      <td>Risaeðlurnar</td>
      <td class="red">1</td>
      <td class="no-border versus">VS</td>
      <td class="green">2</td>
      <td>Framherjarnir</td>
    </tr><tr class="small-screen">
      <td colspan="6" >
        <span>Dagsetning:</span> 19/02/2024 15:20:53
      </td>
    </tr>
    <tr class="match">
      <td class="no-border date">19/02/2024 15:20:53</td>
      <td>Hraðaliðið</td>
      <td class="yellow">1</td>
      <td class="no-border versus">VS</td>
      <td class="yellow">1</td>
      <td>Ósigrandi skotfólkið</td>
    </tr>
    </table>
    <p><a href="./index.html">Til baka</a></p>
  </div>
  </body>
</html>`);
    });
  });



  describe('standingsTemplate', () => {
    it('should generate a correct standings template', () => {
      const result = standingsTemplate([
        { name: 'Sigurliðið', score: 12},
        { name: 'Dripplararnir', score: 7},
        { name: 'Óhemjurnar', score: 2}
      ]);


      expect(result).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Knattspyrnudeildin</title>
    <link rel="stylesheet" href="../public/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
  <div>
    <h2>Staðan</h2>
    <table class="teams">
      <thead>
        <tr class="team">
          <th>Lið</th>
          <th>Stig</th>
        </tr>
      </thead>
      <tr class="team">
    <td>Sigurliðið</td>
    <td>12</td>
  </tr><tr class="team">
    <td>Dripplararnir</td>
    <td>7</td>
  </tr><tr class="team">
    <td>Óhemjurnar</td>
    <td>2</td>
  </tr>
    </table>
    <p><a href="./index.html">Til baka</a></p>
  </div>
  </body>
</html>`);
    });
  });
});
