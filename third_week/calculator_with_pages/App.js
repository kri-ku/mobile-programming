import { StatusBar } from 'expo-status-bar';
import React from 'react';
import History from './components/History';
import Calculator from './components/Calculator'
import { NavigationContainer, StackActions} from '@react-navigation/native'
import { createStackNavigator} from'@react-navigation/stack'


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Calculator" component={Calculator}></Stack.Screen>
          <Stack.Screen  name="History" component={History}></Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" hidden={true}/>
    </NavigationContainer>
    
  );
}

