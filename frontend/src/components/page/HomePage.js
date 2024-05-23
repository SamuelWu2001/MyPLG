import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'react-native';
import IconButton from '../atom/IconButton';
import commonStyles from '../../../styles';
import NewsCardList from '../molecule/NewsCardList';

export default function HomePage() {
    const handlePress = () => {
      console.log('personal file pressed!');
    };

    return (
        <>
          <View style={commonStyles.topBar}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={styles.image}
            />
            <IconButton iconName="person-circle" onPress={handlePress} size={42} />
          </View>
          <NewsCardList/>
        </>
    );
};


const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  }
});