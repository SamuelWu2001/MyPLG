import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import HomePage from '../page/HomePage';
import GamePage from '../page/GamePage';
import ChatPage from '../page/GhatPage';
import DiscoverPage from '../page/DiscoverPage'
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop:5,
          height: 85,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomePage} 
        options={{
          tabBarIcon: ({ focused, color, name }) => {
            name = focused ? "home" : "home-outline";
            return <Ionicons name={name} size={25}/>
          },
          tabBarLabel: ({ focused, color}) => {
            color = focused ? "black" : "gray";
            return <Text style={{ color: color, fontSize: 12 }}> Home </Text>;
          }
        }}
      />
      <Tab.Screen name="Games" component={GamePage} 
        options={{
          tabBarIcon: ({ focused, color, name }) => {
            name = focused ? "basketball" : "basketball-outline";
            return <Ionicons name={name} size={25}/>
          },
          tabBarLabel: ({ focused, color}) => {
            color = focused ? "black" : "gray";
            return <Text style={{ color: color, fontSize: 12 }}> Games </Text>;
          }
        }}
      />
      <Tab.Screen name="Chat Room" component={ChatPage} 
        options={{
          tabBarIcon: ({ focused, color, name }) => {
            name = focused ? "chatbubbles" : "chatbubbles-outline";
            return <Ionicons name={name} size={25}/>
          },
          tabBarLabel: ({ focused, color}) => {
            color = focused ? "black" : "gray";
            return <Text style={{ color: color, fontSize: 12 }}> Chat </Text>;
          }
        }}
      />
      <Tab.Screen name="Discover" component={DiscoverPage} 
        options={{
          tabBarIcon: ({ focused, color, name }) => {
            name = focused ? "ellipsis-horizontal" : "ellipsis-horizontal-outline";
            return <Ionicons name={name} size={25}/>
          },
          tabBarLabel: ({ focused, color}) => {
            color = focused ? "black" : "gray";
            return <Text style={{ color: color, fontSize: 12 }}> Discover </Text>;
          }
        }}
      />
    </Tab.Navigator>
  );
}