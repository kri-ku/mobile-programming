import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

/*
Create Number Guessing game where user have to guess the secret number between 1-100.
Randomnumberbetween 1-100 Math.floor(Math .random() * 100) + 1
*/

export default function App() {
  const [text, setText] = useState('Guess a number between 1-100')
  const [secretNumber, setSecretNumber] = useState(0)
  const [guessedNumber, setGuessedNumber] = useState('')
  const [guesses, setGuesses] = useState(1)

  useEffect(() => setSecretNumber(Math.floor(Math.random() * 100) + 1), [])

  const handleGuesses = () => {
    const added = guesses + 1
    setGuesses(added)
  }
  const buttonPressed = () => {
    const result = secretNumber - guessedNumber
    handleGuesses()

    if (result === 0) {
      Alert.alert(`You guessed the number in ${guesses} guesses`)
      setGuesses(1)
      setText('Guess a number between 1-100')
      setSecretNumber(Math.floor(Math.random() * 100) + 1)
      setGuessedNumber('')

    } else if (result < 0) {
      setText(`Your guess is ${Math.abs(result)} too high`)
    } else {
      setText(`Your guess is ${result} too low`)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={guessedNumber}
        onChangeText={guessedNumber => setGuessedNumber(guessedNumber)}
      ></TextInput>
      <Button
        title='Make a guess'
        color='blue'
        onPress={buttonPressed}
      ></Button>
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
  text: {
    marginBottom: 10,
    fontSize: 20
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    height: 50,
    margin: 10

  }
});
