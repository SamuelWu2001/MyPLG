import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import StatisticDataList from './StatisticDataList';
import PlayerPage from './PlayerPage';
import Standings from './Standings';


const DiscoverStack = createStackNavigator();

export default function DiscoverPage() {
    return (
      <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
        <DiscoverStack.Screen name="StatisticDataList" component={ StatisticDataList }/>
        <DiscoverStack.Screen
          name="Player"
          component={ PlayerPage }
          options={{ gestureEnabled: true }}
        />
        <DiscoverStack.Screen
          name="Standings"
          component={ Standings }
          options={{ gestureEnabled: true }}
        />
      </DiscoverStack.Navigator>
    );
};
