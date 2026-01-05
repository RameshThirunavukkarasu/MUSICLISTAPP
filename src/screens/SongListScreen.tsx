import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { fetchSongs } from '../api/songsApi';

export default function SongListScreen() {
  const handleFetchSongs = async () => {
    try {
      const songs = await fetchSongs();
      console.log('Songs:', songs);
      Alert.alert('Success');
    } catch (error) {
      console.error('Error :', error);
      Alert.alert('Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Song List Screen</Text>
      <Button title="Fetch Songs" onPress={handleFetchSongs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
