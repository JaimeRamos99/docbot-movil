import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Login } from './app/views/Login.js';
import { Home } from './app/views/Home.js';
import { Profile } from './app/views/Profile.js';
import { Chat } from './app/views/Chat.js';
import { Main } from './app/Main.js';
import { Goals } from './app/views/Goals.js';
import { Avatar } from './app/views/Avatar.js';
import { ClinicalHistory } from './app/views/ClinicalHistory.js';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Main: Main
  },
  {
    initialRouteName: 'Login'
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return (
      /*<View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>*/
      //<Chat  />
      <ClinicalHistory />
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
