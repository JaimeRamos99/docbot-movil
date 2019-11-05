import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import DrawerComponent from './DrawerComponent.js'
import Login from '../views/Login.js';
import Home from '../views/Home.js';
import Profile from '../views/Profile.js';
import DoctorMessages from '../views/DoctorMessages.js';
import Chat from '../views/Chat.js';
import { StepCount } from '../views/StepCount.js';
import Goals from '../views/Goals.js';
import ClinicalHistory from '../views/ClinicalHistory.js';
import { Button, Divider, Icon } from 'react-native-elements';

const CustomDrawerContentComponent = props => (
    <DrawerComponent>
      <DrawerNavigatorItems {...props} />
      <Divider style={{ backgroundColor: '#000' }} />
      <Button
        title="Cerrar Sesión"
        titleStyle={{color: '#000'}}
        type="clear"
        onPress={() => props.navigation.navigate('Login')}
      />
    </DrawerComponent>
  );
  
  const MyDrawerNavigator = createDrawerNavigator(
      {
        Inicio: Home,
        DocBot: Chat,
        Mensajes: DoctorMessages,
        Perfil: Profile,
        Metas: Goals,
        Paraclinicos: ClinicalHistory,
        Contador: StepCount,
      },
      {
        initialRouteName: 'Inicio',
        contentComponent: CustomDrawerContentComponent
      }
    );
    
   const Drawer = createAppContainer(MyDrawerNavigator);
  
   const SwitchNavigator = createSwitchNavigator(
    {
      App: Drawer,
      Login: Login,
    },
    {
      initialRouteName: 'Login',
    }
  )

  export const AppContainer = createAppContainer(SwitchNavigator);