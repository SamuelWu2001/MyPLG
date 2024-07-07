import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import IconButton from '../atom/IconButton';
import commonStyles from '../../../styles';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import GameCard from '../molecule/GameCard';
import moment from  'moment';
import 'moment/locale/zh-tw';
import axios from 'axios';
import getEnvVars from '../../../config';
import { useNavigation } from '@react-navigation/native';


const { API_URL } = getEnvVars(process.env.NODE_ENV);
moment.locale('zh-tw');  

export default function GameList() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalVisible, setModelVisible] = useState(false);
  const [gamesListData, setGamesListData] = useState([]);

  useEffect(() => {
    const originalFormat = 'YYYY-MM-DD';
    const parsedDate = moment(selectedDate, originalFormat);
    const originalFormattedDate = parsedDate.format('MM/DD (ddd)')
    const formattedDate = originalFormattedDate.slice(0, -3) + originalFormattedDate.slice(-2);
    const encodedDate = encodeURIComponent(formattedDate).replace(/[()]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
    
    const fetchGames = async (date) => {
      try {
        const response = await axios.get(`${API_URL}/games/date/${date}`);
        setGamesListData(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames(encodedDate);
  }, [selectedDate]);
  
  const toggleModal = () => {
    setModelVisible(!isModalVisible);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModelVisible(!isModalVisible);
  }

  return (
      <>
        <View style={commonStyles.topBar}>
          <Text style={styles.title}> Games </Text>
          <IconButton iconName="calendar" onPress={toggleModal} size={37} />
        </View>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modal}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
              }}
              minDate={'2023-11-01'}
              maxDate={'2024-06-30'}
              current={selectedDate}
            />
          </View>
        </Modal>
        <ScrollView style={styles.container}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}> {selectedDate} </Text>
          </View>
          {
            gamesListData.length ? (
              gamesListData.map((game, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => navigation.navigate('GameInfo', { gameID: game.profile.gameID })}
                >
                  <GameCard
                    gameInfo={game}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.none}>
                <Text style={styles.text}> 本日無賽事 </Text>
              </View>
            )
          }
        </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
    title: {
      color: "black",
      fontSize: 25, 
    },
    modal: {
      backgroundColor: 'white', 
      padding: 20, 
      borderRadius: 10 
    },
    container: {
      flex: 1,
      paddingVertical: 20,
      backgroundColor: 'black',
    },
    text: {
      color: 'white',
      fontSize: 17, 
    },
    date: {
      color: 'white',
      fontSize: 20,
    },
    none: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center', 
      height: 500,
    },
    dateContainer: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    }
});