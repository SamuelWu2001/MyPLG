import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import images from '../../../assets/images/image';

const GameCard = ({ gameInfo }) => {
  const logo = {
    '勇士': images.bravesLogo,
    '鋼鐵人': images.steelersLogo,
    '國王': images.kingsLogo,
    '攻城獅': images.lioneersLogo,
    '領航猿': images.pilotsLogo,
    '夢想家': images.dreamersLogo,
  };
  return (
    <View style={styles.card}>
      <View style={styles.teamContainer}>
        <Image source={logo[gameInfo.profile.away]} style={styles.logo} />
        <Text style={styles.role}>客隊</Text>
        <Text style={styles.teamName}>{gameInfo.profile.away}</Text>
        <Text style={styles.teamNameEN}>{gameInfo.profile.away_EN}</Text>
      </View>
      <View style={styles.gameContainer}>
        <Text style={styles.gameID}>{gameInfo.profile.gameID}</Text>
        <Text style={styles.stadium}>{gameInfo.profile.stadium}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{gameInfo.profile.awayScore}</Text>
          <Text style={styles.separator}>vs</Text>
          <Text style={styles.score}>{gameInfo.profile.homeScore}</Text>
        </View>
        <Text style={styles.time}>{`${gameInfo.profile.gameDate} ${gameInfo.profile.gameTime}`}</Text>
      </View>
      <View style={styles.teamContainer}>
        <Image source={logo[gameInfo.profile.home]} style={styles.logo} />
        <Text style={styles.role}>主隊</Text>
        <Text style={styles.teamName}>{gameInfo.profile.home}</Text>
        <Text style={styles.teamNameEN}>{gameInfo.profile.home_EN}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  teamContainer: {
    flex: 2,
    alignItems: 'center',
  },
  gameContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  scoreContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  logo: {
    width: 70,
    height: 60,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  teamNameEN: {
    fontSize: 7,
  },
  role: {
    fontSize: 10,
  },
  gameID: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
  },
  separator: {
    fontSize: 16,
    marginVertical: 9,
  },
  stadium: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
  },
});

export default GameCard;
