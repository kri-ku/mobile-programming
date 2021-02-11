import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export default function App() {
  const [data, setData] = useState([])
  const [money, setMoney] = useState('')
  const [convertedMoney, setConvertedMoney] = useState('')

  const [currency, setCurrency] = useState('unknown')
  const [pickerValues, setPickerValues] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.exchangeratesapi.io/latest')
      const data = await response.json()
      setData(data.rates)
      setPickerValues(Object.keys(data.rates).sort())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchData() }, [])

  convert = (c) => {
    const vaihtokurssi = parseFloat(data[currency])
    setConvertedMoney((money / vaihtokurssi).toFixed(2))
  }

  return (
    <View style={styles.container}>

      <Text style={{ marginTop: 80, marginBottom: 20, fontSize: 20 }}>Welcome to convert currency to euro!</Text>
      <Image style={{ width: 250, height: 100, margin: 10 }} source={require('./picture.jpg')}></Image>
      <Text style={styles.text}>{convertedMoney} €</Text>
      <TextInput
        style={styles.input}
        value={money}
        onChangeText={money => setMoney(money)}
        keyboardType='numeric'
        returnKeyType="done"
      ></TextInput>
      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Picker
          selectedValue={currency}
          style={{ height: 80, width: 180 }}
          itemStyle={{ height: 80 }}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex != 0) {
              setCurrency(itemValue)
            }
          }}>
          <Picker.Item key={0} label={""} value={0}></Picker.Item>
          {pickerValues.map((value) => {
            return (<Picker.Item key={value} label={value} value={value} />)
          })}
        </Picker>
        <Button onPress={() => convert()} title="CONVERT"></Button>
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
    backgroundColor: 'rgba(255, 250, 0, 0.2)',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    height: 50
  },
  text: {
    fontSize: 20,
    margin: 10
  }
});
