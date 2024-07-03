import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Text, Image, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import TeamProfile from './TeamProfile';
import images from '../../../assets/images/image';

const TeamStack = createStackNavigator();

const TeamsOverview = () => {
    const data = [
        { id: '1', title: '勇士', imageUri: images.bravesLogo, color: '#0080FF' },
        { id: '2', title: '國王', imageUri: images.kingsLogo, color: '#FFD306' },
        { id: '3', title: '領航猿', imageUri: images.pilotsLogo, color: '#FF8000' },
        { id: '4', title: '攻城獅', imageUri: images.lioneersLogo, color: '#6F00D2' },
        { id: '5', title: '夢想家', imageUri: images.dreamersLogo, color: '#82D900' },
        { id: '6', title: '鋼鐵人', imageUri: images.steelersLogo, color: '#FF2D2D' },
    ];

    const navigation = useNavigation();

    const renderRow = (row) => {
        const rowData = data.slice(row * 2, row * 2 + 2);
        if (rowData.length === 1) {
            rowData.push({ id: 'placeholder', title: '' });
        }
        return (
            <View style={styles.boxRow} key={row}>
                {rowData.map((item, index) => (
                    <View key={index} style={styles.boxWrapper}>
                      <TouchableOpacity 
                        style={styles.box}
                        onPress={() => navigation.navigate('TeamProfile', { team: item })}
                      >
                        <Image source={item.imageUri} style={styles.boxImage}/>
                        <Text style={styles.boxText}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}> 球隊介紹 </Text>
          <ScrollView style={ styles.scrollView }>{
            Array.from({ length: Math.ceil(data.length / 2) }).map((_, index) => renderRow(index))}
          </ScrollView>
        </View>
    );
};

export default function TeamsPage() {
    return (
      <TeamStack.Navigator screenOptions={{ headerShown: false }}>
        <TeamStack.Screen name="TeamsOverview" component={ TeamsOverview }/>
        <TeamStack.Screen name="TeamProfile" component={ TeamProfile }/>
      </TeamStack.Navigator>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingVertical: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 23,
        backgroundColor: '#BEBEBE',
    },
    boxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    boxWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    box: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        aspectRatio: 1, 
    },
    boxText: {
        color: '#000',
        fontSize: 20,
        marginTop: 10,
    },
    boxImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});
