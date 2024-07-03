import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

const openTicketWebsite = (link) => {
  Linking.openURL(link);
};

export default TicketInfo = ({ content, color }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}> 購票說明 </Text>
      <Text style={styles.paragraph}> {content?.instruction} </Text>
      <View style={styles.linkContainer}>
        <TouchableOpacity style={{ backgroundColor: color, ...styles.button}} onPress={() => openTicketWebsite(content?.link)}>
          <Text style={styles.buttonText}> 前往售票網站 &gt; </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  linkContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 40,
  },
  title: {
    fontSize: 20,
    marginVertical: 5,
    lineHeight: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 5,
    lineHeight: 24,
    color: 'black',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

});