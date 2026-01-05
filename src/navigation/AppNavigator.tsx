import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Song } from '../types/song';
import SongListScreen from '../screens/SongListScreen';
import SongDetailsScreen from '../screens/SongDetailsScreen';


export type RootStackParamList = {
  SongList: undefined;
  SongDetails: {
    song: Song;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SongList"
        screenOptions={{ headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="SongList"
          component={SongListScreen}
          options={{
            title: 'Songs',
          }}
        />
        <Stack.Screen
          name="SongDetails"
          component={SongDetailsScreen}
          options={{
            title: 'Song Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

