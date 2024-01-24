import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createDirIfNotExists, readFile, readFilesFromDir } from './lib/file.js';
import { gameTemplate, indexTemplate, standingsTemplate } from './lib/html.js';
import { parseJson } from './lib/parse.js';
import { calculateStandings } from './lib/score.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';


/**
 * removes all the invalid matches from a given list.
 * @param {import("./lib/score").Match[]} matches
 * @returns {Promise<import("./lib/score").Match[]>} list of matches, but without the invalid matches
 */
async function removeInvalidGames(matches){
  const filteredMatches = [];
  const validTeamNames = await parseJson(await readFile(join(INPUT_DIR, 'teams.json')));

  for await (const match of matches){
    if (typeof match.home !== 'object' || typeof match.away !== 'object') continue;
    if (match.home === null || match.away === null) continue;
    if (!Number.isInteger(match.home.score) || !Number.isInteger(match.away.score)) continue;
    if (match.home.score < 0 || match.away.score < 0) continue;
    // if the name of either team is not in the valid team name list
    if (!validTeamNames.includes(match.home.name) || !validTeamNames.includes(match.away.name)) continue;

    filteredMatches.push(match);
  }

  return filteredMatches;
}


async function main() {
  await createDirIfNotExists(OUTPUT_DIR);

  const files = await readFilesFromDir(INPUT_DIR);

  const gamedays = [];

  for await (const file of files) {
    if (file.indexOf('gameday') < 0) { // if 'gameday' is not in the filename
      continue;
    }
    const fileContents = await readFile(file);

    const fileData = await parseJson(fileContents);

    if(!fileData?.date || !fileData?.games) continue; // if file isn't valid, then skip it
    fileData.games = await removeInvalidGames(fileData.games);
    gamedays.push(fileData)

  }

  gamedays.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  await writeFile(join(OUTPUT_DIR, 'leikir.html'), gameTemplate(gamedays), { flag: 'w+' });

  const teamStandings = await calculateStandings(gamedays);

  await writeFile(join(OUTPUT_DIR, 'stada.html'), standingsTemplate(teamStandings), { flag: 'w+' });

  await writeFile(join(OUTPUT_DIR, 'index.html'), indexTemplate(), {
    flag: 'w+',
  });
}

main().catch((error) => {
  console.error('error generating', error);
});
