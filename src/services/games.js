import axios from 'axios';

// Fetch data from right date
const getGames = (date) => {
  const response = axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=${date}&endDate=${date}&expand=schedule.game.content.media.epg%2Cschedule.teams`);
  return response;
};

export default { getGames };
