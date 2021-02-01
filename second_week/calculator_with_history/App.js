import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, FlatList } from 'react-native';

/*Add FlatList component that shows calculation history. 
Note! Data is not saved anywhere. When the app is restarted the history is cleared.

 made for iOs
 */

export default function App() {
  const [result, setResult] = React.useState(0)
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [history, setHistory] = useState([])

  const handlePlus = () => {
    setResult(parseInt(firstNumber) + parseInt(secondNumber))
    setHistory([{ key: `${firstNumber} + ${secondNumber} = ${parseInt(firstNumber) + parseInt(secondNumber)}` }, ...history])
  }


  const handleMinus = () => {
    setResult(parseInt(firstNumber) - parseInt(secondNumber))
    setHistory([{ key: `${firstNumber} - ${secondNumber} = ${parseInt(firstNumber) - parseInt(secondNumber)}` }, ...history])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={firstNumber} onChangeText={first => setFirstNumber(first)}></TextInput>

      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={secondNumber} onChangeText={second => setSecondNumber(second)}></TextInput>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePlus()}>
          <Text style={styles.buttontext}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMinus()}>
          <Text style={styles.buttontext}>-</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 20 }}>History</Text>
      <FlatList
        heading="History"
        style={{ flex: 1 }}
        data={history}
        renderItem={({ item }) => {
          return (
            <Text>{item.key}</Text>
          )
        }}
      >
      </FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    paddingBottom: 20,

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttontext: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10

  },
  heading: {
    color: 'black',
    fontSize: 40,
    marginTop: 50


  }
});
