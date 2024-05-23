import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function ChatPage() {
    return (
        <View style={styles.container}>
          <Text>Welcome to React ChatPage!</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});