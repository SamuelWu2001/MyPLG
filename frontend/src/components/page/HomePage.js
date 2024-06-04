import React from 'react';
import NewsArticle from './NewsArticle';
import NewsList from './NewsList';
import { createStackNavigator } from '@react-navigation/stack';


const HomeStack = createStackNavigator();

export default function HomePage() {
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="NewsList" component={ NewsList } />
        <HomeStack.Screen 
          name="Article" 
          component={ NewsArticle }
          options={{ gestureEnabled: true }}
        />
      </HomeStack.Navigator>
    );
};