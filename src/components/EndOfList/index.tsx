import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './EndOfList.styles';

const EndOfList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You've reached the end of the list</Text>
      <View style={styles.line} />
    </View>
  );
};

export default EndOfList;

