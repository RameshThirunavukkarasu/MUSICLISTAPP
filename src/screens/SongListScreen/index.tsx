import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchSongs } from '../../api/songsApi';
import { Song } from '../../types/song';
import SongItem from '../../components/SongItem';
import EndOfList from '../../components/EndOfList';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './SongListScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SongListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadSongs = useCallback(
    async (currentOffset: number, isRefresh: boolean = false) => {
      if (loading) return;

      try {
        setLoading(true);
        const newSongs = await fetchSongs(currentOffset);

        if (newSongs.length === 0) {
          setHasMore(false);
        } else {
          if (isRefresh) {
            setSongs(newSongs);
            setOffset(newSongs.length);
          } else {
            setSongs((prev) => {
              const existingIds = new Set(prev.map((song) => song.trackId));
              const uniqueNewSongs = newSongs.filter(
                (song) => !existingIds.has(song.trackId)
              );
              return [...prev, ...uniqueNewSongs];
            });
            setOffset(currentOffset + newSongs.length);
          }
        }
      } catch (error) {
        console.error('Error loading songs:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    loadSongs(0);
  }, [loadSongs]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadSongs(offset);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setOffset(0);
    setHasMore(true);
    loadSongs(0, true);
  };

  const handleSongPress = (song: Song) => {
    navigation.navigate('SongDetails', { song });
  };

  const renderSongItem = ({ item }: { item: Song }) => (
    <SongItem song={item} onPress={() => handleSongPress(item)} />
  );

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#6200ee" />
        </View>
      );
    }
    if (!hasMore && songs.length > 0) {
      return <EndOfList />;
    }
    return null;
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No songs found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.trackId.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default SongListScreen;

