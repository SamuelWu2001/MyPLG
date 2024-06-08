import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import SearchTable from '../molecule/SearchTable';
import getEnvVars from '../../../config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { API_URL } = getEnvVars(process.env.NODE_ENV);

const PlayerInfo = () => {

  const navigation = useNavigation(); 

  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`${API_URL}/players`);
        const initialData = response.data.map((item, _) => [
          item.playerName, 
          item.jerseyNumber, 
          item.team, 
          item.gamesPlayed,
          item.timePlayed, 
          item.twoPointersMade,
          item.twoPointersAttempted,
          item.twoPointPercentage,
          item.threePointersMade,
          item.threePointersAttempted,
          item.threePointPercentage,
          item.freeThrowsMade,
          item.freeThrowsAttempted,
          item.freeThrowPercentage,
          item.points, 
          item.offensiveRebounds,
          item.defensiveRebounds,
          item.totalRebounds,
          item.assists,
          item.steals,
          item.blocks,
          item.turnovers,
          item.fouls
        ]);
        setPlayerData(initialData);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    }

    fetchPlayerData();
  }, [])



  const tableHead = ['球員', '背號', '球隊', '出賽次數', '時間(分)', '兩分命中', '兩分出手', '兩分％', '三分命中', '三分出手',
  '三分％', '罰球命中', '罰球出手', '罰球％', '得分', '攻板', '防板', '籃板', '助攻', '抄截', '阻攻', '失誤', '犯規'];
  const widthList = [80, 45, 135, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80];
  
  return (
    <View style={styles.outerContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} style={styles.backButton}/>
        </TouchableOpacity>
        <Text style={styles.barTitle}> 球員數據 </Text>
        <View style={styles.rightSpace}/> 
      </View>
      <SearchTable initialData={playerData} tableHead={tableHead} widthList={widthList} placeholder="搜尋球員姓名"/>
    </View>
    
  )
};

const styles = StyleSheet.create({
  topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 16,
      backgroundColor: '#BEBEBE',
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
export default PlayerInfo;