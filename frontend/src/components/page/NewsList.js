import React, { useEffect, useState }  from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import IconButton from '../atom/IconButton';
import commonStyles from '../../../styles';
import NewsCard from '../molecule/NewsCard';
import { useNavigation } from '@react-navigation/native';
import axiosJWT from '../../utils/axiosJWT';
import getEnvVars from '../../../config';

const { API_URL } = getEnvVars(process.env.NODE_ENV);

const NewsList = () => {
  const handlePress = () => {
    console.log('personal file pressed!');
  };

  const navigation = useNavigation();

  const [newsListData, setNewsListData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosJWT.get(`${API_URL}/news`);
        setNewsListData(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
      <>
        <View style={commonStyles.topBar}>
          <Image
            source={require('../../../assets/images/icon.png')}
            style={styles.image}
          />
          <IconButton iconName="person-circle" onPress={handlePress} size={42} />
        </View>
        <ScrollView style={styles.container}>
          {newsListData.map((news, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigation.navigate('Article', { news })}
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
  )
}



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
  
export default NewsList; 