import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function DiscoverPage() {
    return (
        <View style={styles.container}>
          <Text>Welcome to React DiscoverPage!</Text>
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