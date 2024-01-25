import { format } from 'date-fns';

/**
 *
 * @param {number} homeScore
 * @param {number} awayScore
 * @returns {string[]} array of length 2 with the color for home team and away team
 */
function getWinColors(homeScore, awayScore){
  if (homeScore > awayScore){
    return ['green', 'red'];
  }
  if (homeScore < awayScore){
    return ['red', 'green'];
  }
  return ['yellow', 'yellow'];
}

/**
 * Generate a HTML page with title and content.
 *
 * @param {string} content HTML content of the page
 * @returns Full HTML page
 */
export function template(content) {
  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Knattspyrnudeildin</title>
    <link rel="stylesheet" href="../public/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>${content}</body>
</html>`;
}

export function indexTemplate() {
  const content = `<h2>Knattspyrnudeildin</h2>
  <p>Aðeins bestu leikir íslandssögunnar! ⚽</p>
  <p><a href="./leikir.html">Bestu leikirnir</a></p>
  <p><a href="./stada.html">Staðan</a></p>
  `;
  return template(content);
}

// template for each match that is going to be in leikir.html
function matchTemplate(match, date){
  const d = new Date(date);
  const formattedDate = format(d, 'dd/MM/yyyy HH:mm:ss');
  // get the green, red or yellow colors for the scoreboard depending on the score
  const homeAndAwayColors = getWinColors(match.home.score, match.away.score);
  return `<tr class="small-screen">
      <td colspan="6" >
        <span>Dagsetning:</span> ${formattedDate}
      </td>
    </tr>
    <tr class="match">
      <td class="no-border date">${formattedDate}</td>
      <td>${match.home.name}</td>
      <td class="${homeAndAwayColors[0]}">${match.home.score}</td>
      <td class="no-border versus">VS</td>
      <td class="${homeAndAwayColors[1]}">${match.away.score}</td>
      <td>${match.away.name}</td>
    </tr>`;
}

// template for leikir.html
export function gameTemplate(gamedays){
  const content = `
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
      ${gamedays.map((gameday) =>
        gameday.games.map((match) => matchTemplate(match, gameday.date)).join('')
      ).join('')}
    </table>
    <p><a href="./index.html">Til baka</a></p>
  </div>
  `;
  return template(content);
}

// template for each row in stada.html
function standingsRow(team){
  return `<tr class="team">
    <td>${team.name}</td>
    <td>${team.score}</td>
  </tr>`;
}

// template for stada.html
export function standingsTemplate(teams){
  const content = `
  <div>
    <h2>Staðan</h2>
    <table class="teams">
      <thead>
        <tr class="team">
          <th>Lið</th>
          <th>Stig</th>
        </tr>
      </thead>
      ${teams.map((team) =>
        standingsRow(team)
      ).join('')}
    </table>
    <p><a href="./index.html">Til baka</a></p>
  </div>
  `;
  return template(content);
}

