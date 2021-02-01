import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

/*Create simple calculator which contains:
- Two TextInputswith numeric keyboard
- Buttons for calculating sum and subtraction.
 When buttons are pressed the calculated answer is shown in the Text element
 
 made for iOs
 */

export default function App() {
  const [result, setResult] = React.useState('')
  const [firstNumber, setFirstNumber] = React.useState('')
  const [secondNumber, setSecondNumber] = React.useState('')

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

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setResult(parseInt(firstNumber) + parseInt(secondNumber))}>
          <Text style={styles.buttontext}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setResult((firstNumber - secondNumber))}>
          <Text style={styles.buttontext}>-</Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    paddingBottom: 20
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
    color: 'blue',
    fontSize: 20,
    paddingBottom: 20,

  }
});
