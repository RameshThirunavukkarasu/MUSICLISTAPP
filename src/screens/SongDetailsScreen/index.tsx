import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import DownloadButton from '../../components/DownloadButton';
import { styles } from './SongDetailsScreen.styles';

type SongDetailsScreenRouteProp = RouteProp<RootStackParamList, 'SongDetails'>;

interface SongDetailsScreenProps {
  route: SongDetailsScreenRouteProp;
}

const SongDetailsScreen: React.FC<SongDetailsScreenProps> = ({ route }) => {
  const { song } = route.params;

  const formatDuration = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: song.artworkUrl100 || song.artworkUrl60 }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.titleRow}>
          <Text style={styles.title}>{song.trackName}</Text>
          <DownloadButton song={song} />
        </View>
        <Text style={styles.artist}>{song.artistName}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Album</Text>
          <Text style={styles.infoValue}>{song.collectionName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Genre</Text>
          <Text style={styles.infoValue}>{song.primaryGenreName}</Text>
        </View>

        {song.trackTimeMillis && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>
              {formatDuration(song.trackTimeMillis)}
            </Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Release Date</Text>
          <Text style={styles.infoValue}>{formatDate(song.releaseDate)}</Text>
        </View>

        {song.trackPrice && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price</Text>
            <Text style={styles.infoValue}>
              {song.currency} {song.trackPrice}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SongDetailsScreen;
