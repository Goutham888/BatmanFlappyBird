import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SecondScreen from './screens/SecondScreen';

const App = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  Second: {
    screen: SecondScreen,
    navigationOptions: {
      headerTitle: 'Second Page'
    }
  }
})

export default createAppContainer(App);