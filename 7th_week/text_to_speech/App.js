import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Speech from 'expo-speech'

export default function App() {
  const [text, setText] = useState('')

  const speak = () => {
    Speech.speak(text)
    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} returnKeyType="done" multiline={true}></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => speak()}><Text>Press to hear text</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'#FFDAED'
  },
  input: {
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    height: '20%',
    marginTop: 100,
    borderRadius: 8,
    backgroundColor:'white',

  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white'

  }
});
