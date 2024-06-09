import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

const Icon = ({type, name, ...props}) => {
  switch (type) {
    case 'FontAwesome6':
      return <FontAwesome6Icon name={name} {...props} />;
    case 'Ionicons':
      return <IoniconsIcon name={name} {...props} />;
    default:
      return null;
  }
};

const StatisticDataList = () => {
    const data = [
        { id: '1', title: '綜合排行', iconType: 'FontAwesome6', iconName: 'ranking-star', route: '' },
        { id: '2', title: '球隊戰績', iconType: 'Ionicons', iconName: 'stats-chart', route: 'Standings' },
        { id: '3', title: '球員數據', iconType: 'Ionicons', iconName: 'person', route: 'PlayerInfo' },
        { id: '4', title: '球隊數據', iconType: 'FontAwesome6', iconName: 'people-group', route: '' },
        { id: '5', title: '特殊表現', iconType: 'Ionicons', iconName: 'star', route: '' },
        { id: '6', title: 'Hot Zone', iconType: 'FontAwesome6', iconName: 'chart-pie', route: '' },
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
                        onPress={() => navigation.navigate(item.route)}
                      >
                        <Icon type={item.iconType} name={item.iconName} size={40} color="#000" />
                        <Text style={styles.boxText}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}> Statistic </Text>
          <ScrollView style={ styles.scrollView }>{
            Array.from({ length: Math.ceil(data.length / 2) }).map((_, index) => renderRow(index))}
          </ScrollView>
        </View>
    );
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
});

export default StatisticDataList;
