import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import PlayerProfile from './PlayerProfile';
import PlayerStatistic from './PlayerStatistic';

const PlayerStack = createStackNavigator();


export default PlayerPage = () => {
  return (
    <PlayerStack.Navigator screenOptions={{ headerShown: false }}>
      <PlayerStack.Screen name="Statistic" component={ PlayerStatistic }/>
      <PlayerStack.Screen
          name="Profile"
          component={ PlayerProfile }
          options={{ gestureEnabled: true }}
        />
    </PlayerStack.Navigator>
  );
};

