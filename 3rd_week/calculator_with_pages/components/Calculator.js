import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useRef } from 'react';

export default function Calculator({ navigation }) {
    const [result, setResult] = useState(0)
    const [firstNumber, setFirstNumber] = useState('')
    const [secondNumber, setSecondNumber] = useState('')
    const [history, setHistory] = useState([])

    const initialFocus = useRef(null)

    const handlePlus = () => {
        setResult(parseInt(firstNumber) + parseInt(secondNumber))
        setHistory([{ key: String(Math.random() * 1000000), line: `${firstNumber} + ${secondNumber} = ${parseInt(firstNumber) + parseInt(secondNumber)}` }, ...history])
    }

    const handleMinus = () => {
        setResult(parseInt(firstNumber) - parseInt(secondNumber))
        setHistory([{ key: String(Math.random() * 1000000), line: `${firstNumber} - ${secondNumber} = ${parseInt(firstNumber) - parseInt(secondNumber)}` }, ...history])
    }

    const handleButtonPress = (e) => {
        if (e == '+') {
            handlePlus()

        } else if (e == '-') {
            handleMinus()
        }
        setFirstNumber('')
        setSecondNumber('')
        initialFocus.current.focus()
    }


    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Result: {result}</Text>

            <TextInput style={styles.input} keyboardType='numeric' value={firstNumber}
                onChangeText={first => setFirstNumber(first)} ref={initialFocus}></TextInput>

            <TextInput style={styles.input} keyboardType='numeric' value={secondNumber}
                onChangeText={second => setSecondNumber(second)} ></TextInput>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '50%' }}>
                <Button onPress={() => handleButtonPress('+')} title="+"></Button>
                <Button onPress={() => handleButtonPress('-')} title="-"></Button>
                <Button onPress={() => navigation.navigate('History', { history: history })} title="History"></Button>
            </View>
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
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        paddingBottom: 20
    },

    heading: {
        color: 'black',
        fontSize: 20,
        marginTop: 50
    }
});