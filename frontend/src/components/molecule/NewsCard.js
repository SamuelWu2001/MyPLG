import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NewsCard = ({ title, time, imageUrl, tag }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.tag}>{tag}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: '#888',
  },
  tag: {
    position: 'absolute',
    bottom: 8,
    right: 15,
    backgroundColor: '#6C6C6C',
    color: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 5,
    fontSize: 12,
  },
});

export default NewsCard;
