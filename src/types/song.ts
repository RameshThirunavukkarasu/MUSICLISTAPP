/**
 * Song type definition based on iTunes API response
 */
export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl60: string;
  artworkUrl100: string;
  previewUrl: string;
  trackTimeMillis: number;
  releaseDate: string;
  primaryGenreName: string;
  trackPrice?: number;
  currency?: string;
}

/**
 * iTunes API response structure
 */
export interface SongsApiResponse {
  resultCount: number;
  results: Song[];
}
