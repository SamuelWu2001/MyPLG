import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const NewsCardList = () => {
  const data = [
    { id: '1', title: 'News 1', content: 'Content for News 1', img: '../../../assets/images/icon.png' },
    { id: '2', title: 'News 2', content: 'Content for News 2', img: '../../../assets/images/icon.png' },
    { id: '3', title: 'News 3', content: 'Content for News 3', img: '../../../assets/images/icon.png' },
    // Add more news items here...
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default NewsCardList;
