import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameInfo from './GameInfo';
import GameList from './GameList';

const GameStack = createStackNavigator();

export default function GamePage () {
  return (
    <GameStack.Navigator screenOptions={{ headerShown: false }}>
        <GameStack.Screen name="GameList" component={ GameList } />
        <GameStack.Screen 
          name="GameInfo" 
          component={ GameInfo }
          options={{ gestureEnabled: true }}
        />
    </GameStack.Navigator>
  );
};