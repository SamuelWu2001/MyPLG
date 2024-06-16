import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import getEnvVars from '../../../config';

const { API_URL } = getEnvVars(process.env.NODE_ENV);

const PlayerProfile = ({ route }) => {

  const playerName = route.params.playerName;  
  
  const [playerProfile, setPlayerProfile] = useState([]);

  useEffect(() => {
    const getProfileData = async () => {
      console.log('playerName', playerName);
      try {
        const response = await axios.get(`${API_URL}/players/profile/${playerName}`);
        console.log(response.data[0].profile);
        setPlayerProfile(response.data[0].profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getProfileData();
  }, []);
  console.log('playerProfile.education', playerProfile.imgUrl);
  return (
    <ScrollView style={styles.container}>
       <View style={styles.profileContainer}>
         <Image
           style={styles.profileImage}
           source={{ uri: `${API_URL}${playerProfile.imgUrl}` }}
         />
         <View style={styles.profileDetails}>
           <Text style={styles.name}> { playerProfile.playerName } </Text>
           <Text style={styles.englishName}> { playerProfile.playerName_EN } </Text>
           <Text style={styles.info}> 綽號：{ playerProfile.nickName } </Text>
           <Text style={styles.info}> 年資：{ playerProfile.tenure } </Text>
           <Text style={styles.info}> 身高：{ playerProfile.height } </Text>
           <Text style={styles.info}> 體重：{ playerProfile.weight } </Text>
           <Text style={styles.info}> 生日：{ playerProfile.birthDate } </Text>
           <Text style={styles.info}> 出生地：{ playerProfile.birthPlace } </Text>
           <Text style={styles.info}> 身份：{ playerProfile.identity } </Text>
         </View>
       </View>
       <View style={styles.sectionContainer}>
         <Text style={styles.sectionTitle}>學歷</Text>
         {
           playerProfile.education?.map((item, index) => (
             <Text key={index} style={styles.bioText}> { item } </Text>
           ))
         }
       </View>
       <View style={styles.sectionContainer}>
         <Text style={styles.sectionTitle}>經歷</Text>
         {
           playerProfile.experience?.map((item, index) => (
             <Text key={index} style={styles.bioText}> { item } </Text>
           ))
         }
       </View>
       <Card style={{}} containerStyle={styles.card}>
         <Card.Title style={styles.title}>AWARDS 個人獎項</Card.Title>
         <Card.Divider style={{}} />
         {
           playerProfile.awards?.map((item, index) => (
            <Text key={index} style={styles.award}> { item } </Text>
           ))
         }
       </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    alignItems: 'center',
    paddingTop: 80,
  },
  profileImage: {
    width: 150,
    height: 300,
    borderRadius: 20,
  },
  profileDetails: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  englishName: {
    fontSize: 18,
    color: '#fff',
    paddingBottom: 10
  },
  info: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  sectionContainer: {
    padding: 10,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bioText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  award: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  title: {
    color: '#D9B300',
  }
});

export default PlayerProfile;
