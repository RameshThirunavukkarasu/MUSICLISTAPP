import RNFS from 'react-native-fs';
import { Song } from '../types/song';

const getMusicFolder = (): string => {
  return `${RNFS.DownloadDirectoryPath}/MusicListApp`;
};

const MUSIC_FOLDER = getMusicFolder();

const isMusicDirectory = async (): Promise<void> => {
  const exists = await RNFS.exists(MUSIC_FOLDER);
  if (!exists) {
    await RNFS.mkdir(MUSIC_FOLDER);
  }
};

const getSongFilePath = (song: Song): string => {
  const extension =
    song.previewUrl.split('.').pop()?.split('?')[0] || 'm4a';

  const safeTrackName = song.trackName
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();

  const safeArtistName = song.artistName
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();

  return `${MUSIC_FOLDER}/${safeArtistName}_${safeTrackName}.${extension}`;
};

export const downloadSong = async (song: Song): Promise<string> => {
  await isMusicDirectory();

  const filePath = getSongFilePath(song);

  const alreadyDownloaded = await RNFS.exists(filePath);
  if (alreadyDownloaded) {
    return filePath;
  }

  const result = await RNFS.downloadFile({
    fromUrl: song.previewUrl,
    toFile: filePath,
  }).promise;

  if (result.statusCode !== 200) {
    throw new Error('Failed to download song');
  }

  return filePath;
};

export const isSongDownloaded = async (song: Song): Promise<boolean> => {
  try {
    const filePath = getSongFilePath(song);
    return await RNFS.exists(filePath);
  } catch {
    return false;
  }
};

export const getDownloadedSongsPath = (): string => {
  return MUSIC_FOLDER;
};
