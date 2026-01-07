import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Song } from '../../types/song';
import DownloadButton from '../DownloadButton';
import { styles } from './SongItem.styles';

interface SongItemProps {
  song: Song;
  onPress: () => void;
  refreshKey?: number;
}

const SongItem: React.FC<SongItemProps> = ({ song, onPress, refreshKey }) => {
  const formatDuration = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: song.artworkUrl100 }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.trackName} numberOfLines={1}>
            {song.trackName}
          </Text>
          <DownloadButton song={song} size="small" refreshKey={refreshKey} />
        </View>
        <Text style={styles.artistName} numberOfLines={1}>
          {song.artistName}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={styles.genre}>{song.primaryGenreName}</Text>
          {song.trackTimeMillis && (
            <Text style={styles.duration}>
              {formatDuration(song.trackTimeMillis)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;

