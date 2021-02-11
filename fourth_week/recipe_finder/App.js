import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, Image } from 'react-native';

export default function App() {
  const [data, setData] = useState([])
  const [searchWord, setSearchWord] = useState('')

  const fetchData = async () => {
    const url = `http://www.recipepuppy.com/api/?q=${searchWord}&p=3`
    try {
      const reponse = await fetch(url)
      const data = await reponse.json()
      setData(data.results)
    } catch (error) {
      Alert.alert('Error', error)
    }

  }

  const buttonPressed = () => {
    fetchData()
    setSearchWord('')
  }

  const renderRecipe = (recipe) => {
    if (recipe.thumbnail == "") {
      return (
        <View style={{ margin: 5 }}>
          <Text>{recipe.title}</Text>
        </View>
      )
    }
    return (
      <View style={{ margin: 5 }}>
        <Text>{recipe.title}</Text>
        <Image style={{ width: 75, height: 75, marginBottom: 10, marginTop: 10 }} source={{ uri: `${recipe.thumbnail}` }}></Image>
      </View>
    )
  }

  const ItemSeparator = () => {
    return (
      <View style={{ height: 2, width: '90%', backgroundColor: 'gray', marginRight: '10%' }}></View>
    )
  }


  return (
    <View style={styles.container}>

      <FlatList style={styles.list}
        data={data}
        keyExtractor={(item) => String(Math.random() * 1000000)}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <Text>Start by typing search word or try again</Text>
        }
        renderItem={({ item }) => {
          return (
            renderRecipe(item)
          )
        }}>
      </FlatList>

      <TextInput style={styles.input} onChangeText={text => setSearchWord(text.toLowerCase())} value={searchWord}></TextInput>
      <Button onPress={() => buttonPressed(searchWord)} title="Search"></Button>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 50,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  list: {
    width: '80%',
    marginTop: 50

  }
});
