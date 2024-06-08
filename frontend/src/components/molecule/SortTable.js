import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const timeStringToMinutes = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

const SortTable = ({ initialData, tableHead, widthList }) => {

  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    setTableData(initialData);
  }, [initialData])

  const handleSort = (columnIndex) => {
    const newTableData = [...tableData];
    newTableData.sort((a, b) => {
        const isNumberColumn = !isNaN(a[columnIndex]) && !isNaN(b[columnIndex]);
        if (isNumberColumn) {
          return Number(b[columnIndex]) - Number(a[columnIndex]);
        } else if (/^\d+:\d+$/.test(a[columnIndex]) && /^\d+:\d+$/.test(b[columnIndex])) {
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
    <ScrollView style={styles.table} horizontal>
      <ScrollView>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row
            data={tableHead.map((head, index) => (
              <TouchableOpacity key={index} onPress={() => handleSort(index)}>
                <Text style={styles.text}>{head}</Text>
              </TouchableOpacity>
            ))}
            style={styles.head}
            textStyle={styles.text}
            widthArr={widthList} // Adjust the width of each column
          />
          <Rows data={tableData} style={styles.content} textStyle={styles.text} widthArr={widthList} />
        </Table>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#f1f8ff',
  },
  text: {
    padding: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#fff',
  },
  table: {
    borderWidth: 2,
    borderColor: '#9D9D9D',
    borderRadius: 5
  }
});

export default SortTable;
