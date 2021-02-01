import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

/*
Create a simple shopping list app. 
Note! Data is not saved anywhere. 
It is only shown in the list component. Clear button will clear all items from the list.*/

export default function App() {
  const [data, setData] = useState([])
  const [item, setItem] = useState()

  const handleClear = () => {
    setData([])
    setItem('')
  }

  const handleAdd = () => {
    setData([...data, { key: item }])
    setItem('')
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={item} onChangeText={item => setItem(item)}></TextInput>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Button
          title="ADD"
          onPress={handleAdd}></Button>
        <Button
          title="CLEAR"
          onPress={handleClear}></Button>
      </View>
      <Text style={{ color: 'blue', fontSize: 20 }}> Shopping list</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.key}</Text>
            </View>
          )
        }
        }></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 90
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
