import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import images from '../../../assets/images/image';
import SortTable from '../molecule/SortTable';
import getEnvVars from '../../../config';
import axios from 'axios';
import * as Linking from 'expo-linking';

const { API_URL } = getEnvVars(process.env.NODE_ENV);

const openStreamtWebsite = (link) => {
  Linking.openURL(link);
}

const GameInfo = ({ route }) => {
  const [gameData, setGameData] = useState({});
  const tableHead = ['#', '球員', '時間', '兩分', '兩分％', '三分', '三分％', '罰球', '罰球％', 
  '得分', '籃板', '攻板', '防板', '助攻', '抄截', '阻攻', '失誤', '犯規', 'EFF', '+/-', 'TS%', 'EFG%'];
  const widthList = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
  const fullTeamName = {
    '國王': '新北國王',
    '勇士': '臺北富邦勇士',
    '攻城獅': '新竹御頂攻城獅',
    '夢想家': '福爾摩沙夢想家',
    '鋼鐵人': '高雄17直播鋼鐵人',
    '領航猿': '桃園璞園領航猿',
  };
  const logo = {
    '國王': images.kingsLogo,
    '勇士': images.bravesLogo,
    '攻城獅': images.lioneersLogo,
    '夢想家': images.dreamersLogo,
    '鋼鐵人': images.steelersLogo,
    '領航猿': images.pilotsLogo,
  };
  useEffect(() => {
      const fetchGames = async (gameID) => {
        try {
          const response = await axios.get(`${API_URL}/games/${gameID}`);
          setGameData(response.data);
        } catch (error) {
          console.error('Error fetching game info:', error);
        }
      };
   
      fetchGames(route.params.gameID);
    }, []);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{gameData.profile?.gameDate} {gameData.profile?.gameTime}</Text>
        <Text style={styles.location}>@ {gameData.profile?.stadium}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{gameData.profile?.type} {gameData.profile?.gameID}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.team}>
          <Image source={logo[gameData.profile?.away]} style={styles.logo} />
          <Text style={styles.teamName}>{fullTeamName[gameData.profile?.away]}</Text>
          <Text style={styles.teamName_EN}>{gameData.profile?.away_EN}</Text>
          <Text style={styles.score}>{gameData.profile?.awayScore}</Text>
        </View>
        <View style={styles.team}>
          <Image source={logo[gameData.profile?.home]} style={styles.logo} />
          <Text style={styles.teamName}>{fullTeamName[gameData.profile?.home]}</Text>
          <Text style={styles.teamName_EN}>{gameData.profile?.home_EN}</Text>
          <Text style={styles.score}>{gameData.profile?.homeScore}</Text>
        </View>
      </View>

      <View style={styles.scoreDetails}>
        <View style={styles.quarterContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[0][0]}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>Q1</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[0][1]}</Text>
          </View>
        </View>
        <View style={styles.quarterContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[1][0]}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>Q2</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[1][1]}</Text>
          </View>
        </View>
        <View style={styles.quarterContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[2][0]}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>Q3</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[2][1]}</Text>
          </View>
        </View>
        <View style={styles.quarterContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[3][0]}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>Q4</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[3][1]}</Text>
          </View>
        </View>
        <View style={styles.saparateLine}/>
        <View style={styles.quarterContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[4][0]}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>Final</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>-</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.quarterScore}>{gameData.profile?.boxScore[4][1]}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statisticContainer}>
        <Text style={styles.statisticTitle}>{fullTeamName[gameData.profile?.home]}</Text>
        <View style={styles.table}> 
          <SortTable initialData={[]} tableHead={tableHead} widthList={widthList}/>
        </View>
        <Text style={styles.statisticTitle}>{fullTeamName[gameData.profile?.away]}</Text>
        <View style={styles.table}> 
          <SortTable initialData={[]} tableHead={tableHead} widthList={widthList}/>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => openStreamtWebsite(gameData.profile?.streamLink)}>
          <Text style={styles.button}>立即看線上直播</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openStreamtWebsite(gameData.profile?.streamLink_EN)}>
          <Text style={styles.button}>Live Broadcasting</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statisticContainer: {
    padding: 20,
  },
  statisticTitle: {
    color: '#fff',
    fontSize: 17,
    paddingVertical: 10,
  },
  table: {
      flex: 1,
      backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#D4A373',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: 16,
    color: '#FFF',
  },
  date: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#FFF',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 20,
    backgroundColor: 'black',
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 3,
    color: '#FFF',
  },
  teamName_EN: {
    fontSize: 15,
    marginVertical: 3,
    color: '#FFF',
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scoreDetails: {
    alignItems: 'center',
    backgroundColor: 'black',
    paddingBottom: 20,
  },
  quarterContainer: {
    flexDirection: 'row',
    width: 220,
    paddingVertical: 5,
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center'
  },
  saparateLine: {
    height: 0.2,
    width: 205,
    backgroundColor: '#fff',
    marginVertical: 5
  },
  quarterScore: {
    fontSize: 18,
    color: '#fff',
  },
  finalScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#D4A373',
  },
  button: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default GameInfo;
