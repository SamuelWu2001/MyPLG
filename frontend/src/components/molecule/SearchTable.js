import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import SortTable from './SortTable';

const SearchTable = ({ initialData, tableHead, widthList, placeholder="", searchIndex=0, seeDetail }) => {
  const [tableData, setTableData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTableData(initialData);
  }, [initialData])
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setTableData(
        initialData.filter((row) =>
          row[searchIndex].includes(query)
        )
      );
    } else {
      setTableData(initialData);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <SortTable initialData={tableData} tableHead={tableHead} widthList={widthList} seeDetail={seeDetail}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#F0F0F0',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8
  },
});

export default SearchTable;
