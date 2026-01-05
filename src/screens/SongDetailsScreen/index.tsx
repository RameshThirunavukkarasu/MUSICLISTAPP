import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './SongDetailsScreen.styles';

const SongDetailsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Song Details Screen</Text>
    </View>
  );
};

export default SongDetailsScreen;
