import { Song, SongsApiResponse } from '../types/song';

const ITUNES_API_BASE_URL = 'https://itunes.apple.com/search';

export const fetchSongs = async (offset: number = 0): Promise<Song[]> => {
  try {
    const url = `${ITUNES_API_BASE_URL}?term=arijit&entity=song&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API failed : ${response.status}`);
    }

    const data: SongsApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
