import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function History({ route }) {
  const { history } = route.params

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <Text>History</Text>}
        data={history}
        keyExtractor={(item) => item.key}
        renderItem={({ item}) => {
          return (
          <Text>{item.line}</Text>
          )}}
      ></FlatList>
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