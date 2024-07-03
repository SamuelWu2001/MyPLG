import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import getEnvVars from '../../../config';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../../assets/images/image';
import TeamIntroduction from '../molecule/TeamIntroduction';
import TicketInfo from '../molecule/TicketInfo';
import StadiumInfo from '../molecule/StadiumInfo';
import PlayerList from '../molecule/PlayerList';

const { API_URL } = getEnvVars(process.env.NODE_ENV);


const TeamProfile = ({ route }) => {

  const [teamProfile, setTeamProfile] = useState({}); 

  const [showStatus, setShowStatus] = useState(0); 

  const team = route.params.team;  

  const teamInfo = {
    '勇士': { imgUrl: images.bravesLogo, name: '臺北富邦勇士' },
    '國王': { imgUrl: images.kingsLogo, name: '新北國王' },
    '領航猿': { imgUrl: images.pilotsLogo, name: '桃園璞園領航猿' },
    '攻城獅': { imgUrl: images.lioneersLogo, name: '新竹御頂攻城獅' },
    '夢想家': { imgUrl: images.dreamersLogo, name: '福爾摩沙夢想家' },
    '鋼鐵人': { imgUrl: images.steelersLogo, name: '高雄17直播鋼鐵人' },
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/teams/profile/${team.title}`);
        setTeamProfile(response.data[0].profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    getProfileData();
  }, []);

  return (
    <LinearGradient colors={[team.color, '#ffffff']} end={{ x: 0.5, y: 0.3 }}  style={styles.gradient}>
      <ScrollView style={styles.container}>
        <Image
          style={styles.logo}
          source={teamInfo[team.title].imgUrl} 
        />
        <Text style={styles.title}>{ teamInfo[team.title].name }</Text>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setShowStatus(0)}>
            <Text style={{ fontWeight: showStatus===0 ?'bold':'normal', ...styles.navItem}}>球隊簡介</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowStatus(1)}>
          <Text style={{ fontWeight: showStatus===1 ?'bold':'normal', ...styles.navItem}}>球隊陣容</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowStatus(2)}>
          <Text style={{ fontWeight: showStatus===2 ?'bold':'normal', ...styles.navItem}}>主場館</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowStatus(3)}>
          <Text style={{ fontWeight: showStatus===3 ?'bold':'normal', ...styles.navItem}}>售票資訊</Text>
          </TouchableOpacity>
        </View>
        {
          showStatus === 0 ? 
            <TeamIntroduction content={teamProfile.introduction}/>
          :
            showStatus === 1 ?
              <PlayerList  team={teamInfo[team.title].name}/>
            :
              showStatus === 2 ?
                <StadiumInfo content={teamProfile.facility}/>
              :
                <TicketInfo content={teamProfile.purchase} color={team.color}/>
        }
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 30,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 16,
    color: '#000',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default TeamProfile;
