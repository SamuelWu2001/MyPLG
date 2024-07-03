import React, { useEffect, useState, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import getEnvVars from '../../../config';
import PlayerCard from './PlayerCard';

const { API_URL } = getEnvVars(process.env.NODE_ENV);

const PlayerList = memo(({ team }) => {
  const [playerListData, setPlayerListData] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${API_URL}/players/profile/team/${team}`);
        setPlayerListData(response.data);
      } catch (error) {
        console.error('Error fetching player list:', error);
      }
    };

    fetchPlayers();
  }, []); // Ensure useEffect depends on 'team' prop only

  const renderPlayerRows = () => {
    const rows = [];
    for (let i = 0; i < playerListData.length; i += 2) {
      const players = playerListData.slice(i, i + 2);
      const rowKey = i;

      // Ensure we have exactly 2 items in the row
      while (players.length < 2) {
        players.push(null); // Push an empty player object
      }

      rows.push(
        <View style={styles.row} key={rowKey}>
          {players.map((player, index) => 
            player ? (
              <PlayerCard
                key={index}
                name={player.profile.playerName}
                info={`#${player.profile.jerseyNumber} | ${player.profile.weight} | ${player.profile.height}`}
                imageUrl={`${API_URL}${player.profile.imgUrl}`}
              />
            ) : (
              <View key={index} style={styles.emptyCard}/>
            ))
          }
        </View>
      );
    }
    return rows;
  };

  return (
    <>
      {renderPlayerRows()}
      <View style={styles.blank}/>
    </>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyCard: {
    backgroundColor: '#fff',
    margin: 10,
    flex: 1,
  },
  blank: {
    paddingVertical: 15,
  }
});

export default PlayerList;
