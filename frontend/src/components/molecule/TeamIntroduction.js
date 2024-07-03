import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default TeamIntroduction = ({ content }) => {
    return (
      <View style={styles.content}>
        <Text style={styles.title}> 核心理念 </Text>
        <Text style={styles.paragraph}> {content?.coreValues} </Text>
        <Text style={styles.title}> 品牌故事 </Text>
        <Text style={styles.paragraph}> {content?.brandStory} </Text>
        <Text style={styles.title}> 成立時間 </Text>
        <Text style={styles.paragraph}> {content?.establishmentDate} </Text>
      </View>
    )

}


const styles = StyleSheet.create({
    content: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 20,
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
});