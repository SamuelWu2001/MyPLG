import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const timeStringToMinutes = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

const SortTable = ({ initialData, tableHead, widthList, seeDetail=()=>{} }) => {

  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    setTableData(initialData);
  }, [initialData])

  const handleSort = (columnIndex) => {
    const newTableData = [...tableData];
    newTableData.sort((a, b) => {
        if (/^\d+:\d+$/.test(a[columnIndex]) && /^\d+:\d+$/.test(b[columnIndex])) {
          const aTimeInMinutes = timeStringToMinutes(a[columnIndex]);
          const bTimeInMinutes = timeStringToMinutes(b[columnIndex]);
          return bTimeInMinutes - aTimeInMinutes;
        } else {
          if (a[columnIndex] < b[columnIndex]) return 1;
          if (a[columnIndex] > b[columnIndex]) return -1;
          return 0;
        }
      });
    setTableData(newTableData);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row
              data={tableHead.map((head, index) => (
                <TouchableOpacity key={index} onPress={() => handleSort(index)}>
                  <Text style={styles.text}>{head}</Text>
                </TouchableOpacity>
              ))}
              style={styles.head}
              widthArr={widthList} // Adjust the width of each column
            />
          </Table>
          <ScrollView style={{ marginTop: -1}}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9'}}> 
              {
                tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={
                      rowData.map((cellData, cellIndex) => {
                        if (cellIndex == 0) {
                          return (
                            <TouchableOpacity onPress={() => seeDetail(cellData)}>
                              <Text style={styles.text}>{cellData}</Text>
                            </TouchableOpacity>
                          );
                        } else {
                          return (
                            <Text style={styles.text}>{cellData}</Text>
                          );
                        }
                      })
                    }
                    widthArr={widthList}
                    textStyle={styles.text}
                    style={StyleSheet.flatten([styles.content, index % 2 && { backgroundColor: '#E0E0E0' }])} 
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    padding: 6,
    textAlign: 'center',
  },
  content: {
    height: 40,
    backgroundColor: '#fff',
  },
  table: {
    borderWidth: 2,
    borderColor: '#9D9D9D',
    borderRadius: 5
  },
  container: { flex: 1, backgroundColor:'#fff'},
});

export default SortTable;