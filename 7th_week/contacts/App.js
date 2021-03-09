import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts'

export default function App() {
  const [contacts, setContacts] = useState([])

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data)
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        renderItem={({item}) => {
          return (
            <View>
            <Text>{`${item.name}, ${item.phoneNumbers ? item.phoneNumbers[0].number : ''}`}</Text>
            </View>
          )
        }}
      />
    <TouchableOpacity style={styles.button} onPress={() => getContacts()}><Text>See Contacts</Text></TouchableOpacity>
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
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white'

  }
});
