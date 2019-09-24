import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons';
import { Home } from './views/Home.js';
import { Profile } from './views/Profile.js';
import { Chat } from './views/Chat.js';
import { Goals } from './views/Goals.js';
import { Avatar } from './views/Avatar.js';
import { ClinicalHistory } from './views/ClinicalHistory.js'
import { StepCount } from './views/StepCount.js';
import { reactNativePedometer } from './views/StepCountPrueba';

const MyDrawerNavigator = createDrawerNavigator(
    {
      Inicio: Home,
      Chat: Chat,
      Perfil: Profile,
      Metas: Goals,
      Avatar: Avatar,
      Paraclinicos: ClinicalHistory,
      Contador: StepCount,
    },
    {
      initialRouteName: 'Inicio'
    }
  );
  
const Drawer = createAppContainer(MyDrawerNavigator);

export class Main extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#1438A6',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  render(){
    return (
      <Drawer />
    );
  }
}