import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import IconButton from '../atom/IconButton';
import commonStyles from '../../../styles';

export default function GamePage() {
    const handlePress = () => {
      console.log('calendar pressed!');
    };

    return (
        <>
          <View style={commonStyles.topBar}>
            <Text style={styles.title}> Games </Text>
            <IconButton iconName="calendar" onPress={handlePress} size={37} />
          </View>
        </>
    );
};


const styles = StyleSheet.create({
    title: {
      color: "black",
      fontSize: 25, 
    }
});