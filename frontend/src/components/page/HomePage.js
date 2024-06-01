import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import IconButton from '../atom/IconButton';
import commonStyles from '../../../styles';
import NewsCard from '../molecule/NewsCard';
import axios from 'axios';
import getEnvVars from '../../../config';
import NewsArticle from './NewsArticle';

const { API_URL } = getEnvVars(process.env.NODE_ENV);

export default function HomePage() {
    const handlePress = () => {
      console.log('personal file pressed!');
    };

    const [newsList, setNewsList] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await axios.get(`${API_URL}/news`);
          setNewsList(response.data);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };
  
      fetchNews();
    }, []);

    return (
        <>
          { 
            selectedNews?
              <NewsArticle article={selectedNews} handlePress={setSelectedNews}/>
            :
              <>
                <View style={commonStyles.topBar}>
                  <Image
                    source={require('../../../assets/images/icon.png')}
                    style={styles.image}
                  />
                  <IconButton iconName="person-circle" onPress={handlePress} size={42} />
                </View>
                <ScrollView style={styles.container}>
                  {newsList.map((news, index) => (
                    <TouchableOpacity 
                      key={index} 
                      onPress={() => setSelectedNews(news)}
                    >
                      <NewsCard
                        title={news.title}
                        time={news.publishedAt}
                        imageUrl={`${API_URL}${news.imgUrl.slice(1)}`}
                        tag={news.tag}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
          }
        </>
        
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  image: {
    width: 60,
    height: 60,
  }
});

