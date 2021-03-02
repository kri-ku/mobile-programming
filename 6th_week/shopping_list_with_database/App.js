import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite'
/*
shopping list app,
data saved to db*/

const db = SQLite.openDatabase('itemdb.db')
//db.transaction(callback, error, success)

export default function App() {
  const [data, setData] = useState([])
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')


  useEffect(() => {
    createTable()
  }, [])

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists item (id integer primary key not null, product text, amount text);')
    }, null, updateList)
  }

  const saveProduct = () => {
    db.transaction(tx => {
      tx.executeSql('insert into item (product, amount) values (?, ?);', [product, amount])
    }, null, updateList)
    setProduct('')
    setAmount('')
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from item;', [], (_, { rows }) => setData(rows._array))
    })
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from item where id = ?;', [id])
    }, null, updateList)

  }

  return (
    <View style={styles.container}>

      <View style={{ marginTop: 70, marginBottom: 10 }}>
        <TextInput style={styles.input} value={product} onChangeText={product => setProduct(product)} placeholder="product" returnKeyType="done"></TextInput>
        <TextInput style={styles.input} value={amount} onChangeText={amount => setAmount(amount)} placeholder="amount" returnKeyType="done"></TextInput>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <TouchableOpacity style={styles.button}
          onPress={saveProduct}><Text>ADD</Text></TouchableOpacity>
      </View>

      <Text style={{ color: 'blue', fontSize: 20, margin: 10 }}> Shopping list</Text>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>{item.product}, {item.amount}</Text>
              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.bought}>
                <Text>Bought</Text></TouchableOpacity>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 2
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 3,
    borderColor: 'gray',
    borderWidth: 1
  },
  bought: {
    padding: 4,
    margin: 4,
    marginLeft: 7,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
  }
});
