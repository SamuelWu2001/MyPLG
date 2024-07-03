import React, { useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import SortTable from '../molecule/SortTable';
import axios from 'axios';
import getEnvVars from '../../../config';
import { Ionicons } from '@expo/vector-icons';

const { API_URL } = getEnvVars(process.env.process);

const Standings = () => {

  const navigation = useNavigation(); 
  const [standingsData, setStandingsData] = useState([]);

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await axios.get(`${API_URL}/teams/standings`);
        const initialData = response.data.map((item) => [
            item.standings.rank,
            item.profile.team,
            item.standings.gamesPlayed,
            item.standings.win,
            item.standings.loss, 
            item.standings.winRate,
            item.standings.gamesBehind,
            item.standings.winStreak,
            item.standings.againstPilots,
            item.standings.againstDreamers,
            item.standings.againstKings,
            item.standings.againstLioneers,
            item.standings.againstBraves,
            item.standings.againstSteelers
        ]);
        setStandingsData(initialData);
      } catch (error) {  
        console.error('Error fetching standings data:', error);
      }
    };  
    fetchStandingsData();
  }, [])  

  const tableHead = ['排名', '球隊', '已賽 GP', '勝 W', '敗 L', '勝率 PCT', '勝差', '連勝連敗',
    '領航猿', '夢想家', '國王', '攻城獅', '勇士', '鋼鐵人'];
  const widthList = [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} style={styles.backButton}/>
        </TouchableOpacity>
        <Text style={styles.barTitle}> 球隊戰績 </Text>
        <View style={styles.rightSpace}/> 
      </View>
      <View style={styles.table}> 
        <SortTable initialData={standingsData} tableHead={tableHead} widthList={widthList}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    table: {
        padding: 10,
        flex: 1,
    },
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

export default Standings;