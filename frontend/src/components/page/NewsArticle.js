import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import getEnvVars from '../../../config';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const { API_URL } = getEnvVars(process.env.NODE_ENV);

const NewsArticle = ({ route }) => {
    const navigation = useNavigation();
    const article = route.params.news;
    return (
        <View style={styles.outerContainer}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} style={styles.backButton}/>
                </TouchableOpacity>
                <Text style={styles.barTitle}>{article.tag.slice(2)}</Text>
                <View style={styles.rightSpace} /> 
            </View>
            <ScrollView style={styles.container}>
                <Image source={{ uri: `${API_URL}${article.imgUrl.slice(1)}` }} style={styles.image} />
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.time}>{article.time}</Text>
                <Text style={styles.content}>{article.content}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  tag: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
  },
  topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 16,
      backgroundColor: '#f8f8f8',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
  },
  outerContainer: {
      flex: 1,
      backgroundColor: '#fff',
  },
  backButton: {
    width: 40,  
    alignItems: 'center',
  },
  rightSpace: {
    width: 40,  
  },
  barTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewsArticle;
