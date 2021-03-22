import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Button, Icon, Input, ListItem } from 'react-native-elements'
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('addressdb.db')

export default function HomeScreen({ navigation }) {
    const [address, setAddress] = useState('')
    const [allAddresses, setAllAdrresses] = useState([])

    useEffect(() => { createTable() }, [])

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists address (id integer primary key not null, address text);')
        }, null, updateList)
    }
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from address;', [], (_, { rows }) => setAllAdrresses(rows._array))
        })
    }

    const saveAddress = () => {
        db.transaction(tx => {
            tx.executeSql('insert into address (address) values (?);', [address])
        }, null, updateList)
        setAddress('')
    }

    const deleteAddress = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from address where id = ?;', [id])
        }, null, updateList)

    }

    const renderListItem = (add) => {
        return (
            <ListItem
                onLongPress={() => deleteAddress(add.id)}
                onPress={() => navigation.navigate('Map', { address: { add } })}
                bottomDivider adjustsFontSizeToFit containerStyle={{ width: 350, alignItems: 'center', justifyContent: 'space-between' }}>
                <ListItem.Title numberOfLines={1} style={{ flexShrink: 1 }}>{add.address}</ListItem.Title>
                <View adjustsFontSizeToFit style={{ flexDirection: 'row' }}>
                    <ListItem.Subtitle style={{ color: 'gray' }}>Show on map</ListItem.Subtitle>
                    <ListItem.Chevron></ListItem.Chevron>
                </View>
            </ListItem>
        )
    }

    const ButtonComponent = () => {
        return (
            <Button
                type="outline"
                raised="true"
                buttonStyle={{ width: 200, padding: 10, backgroundColor: '#C2C0C7', borderColor: 'gray' }}
                titleStyle={{ marginLeft: 10, color: 'white' }}
                title="SAVE"
                onPress={() => saveAddress()}
                icon={
                    <Icon
                        type="font-awesome"
                        name="floppy-o"
                        color='white'>
                    </Icon>
                }></Button>
        )
    }
    const ListComponent = () => {
        return (
            <FlatList
                style={{ marginTop: 20 }}
                data={allAddresses}
                keyExtractor={address => address.id.toString()}
                renderItem={({ item }) => renderListItem(item)}></FlatList>
        )
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Type in address"
                label="PLACEFINDER"
                value={address}
                onChangeText={address => setAddress(address)}
                containerStyle={{ marginTop: 20 }}
                returnKeyType="done"
            ></Input>
            <ButtonComponent></ButtonComponent>
            <ListComponent></ListComponent>
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
});
