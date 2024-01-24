
/**
 * Match object with the names and scores for the two teams that participated in the match.
 * @typedef {object} Match
 * @property {object} home - contains the score and name for the team
 * @property {object} away - contains the score and name for the team
 */

/**
 * Game file with a date and list of games.
 * @typedef {object} GameFile
 * @property {string} date - date which the games were played, in ISO 8601 form (e.g. 2024-01-01T00:00:00.000Z)
 * @property {Match[]} games - list of matches
 */

/**
 * @typedef {object} TeamStanding
 * @property {string} name - the name of the team
 * @property {number} score - the score of the team
 */

/**
 * calculates the scores that each eam should get based on the outcome of the match.
 * 3 scores for winning, 1 score for a tie, and 0 for loosing.
 * @param {Match} match
 * @returns {number[]} list of length 2, with the score each team will get for the match
 */
function calculateScores(match){
  if (match.home.score > match.away.score) return [3,0];
  if (match.home.score < match.away.score) return [0,3];
  return [1,1];
}


/**
 * gets in a list of type GameFile and calculates the score for each team
 * @param {GameFile[]} gamedays
 * @returns {TeamStanding[]} ordered list of teamstandings
 */
export function calculateStandings(gamedays) {

  const teams = [];

  for(const gameday of gamedays){
    for(const match of gameday.games){
      const scores = calculateScores(match); // scores to add to home team and away team

      if(teams.filter(e => e.name === match.home.name).length === 0){ // if the home team is not in teams list
        const newTeamStanding = {name: match.home.name, score: scores[0]};
        teams.push(newTeamStanding);
      }else if (scores[0] > 0){ // home team already exists in the list and there is score to add to the team
        const homeTeam = teams.find(team => team.name === match.home.name);
        if(homeTeam) homeTeam.score += scores[0];
        else console.warn('ERROR: did not find home team');
      }

      if(teams.filter(e => e.name === match.away.name).length === 0){ // if the away team is not in teams list
        const newTeamStanding = {name: match.away.name, score: scores[1]};
        teams.push(newTeamStanding)
      }else if (scores[1] > 0){ // away team already exists in the list and there is score to add to the team
        const awayTeam = teams.find(team => team.name === match.away.name);
        if(awayTeam) awayTeam.score += scores[1];
        else console.warn('ERROR: did not find away team');
      }
    }
  }

  return teams.sort((a,b) => b.score - a.score);
}
