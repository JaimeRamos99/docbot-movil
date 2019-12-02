import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../views/Login.js';
import Home from '../views/Home.js';
import Profile from '../views/Profile.js';
import DoctorMessages from '../views/DoctorMessages.js';
import Chat from '../views/Chat.js';
import StepCount from '../views/StepCount.js';
import Goals from '../views/Goals.js';
import ClinicalHistory from '../views/ClinicalHistory.js';
import { save, get } from '../services/Persistant.js';

class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.defineInitialScreen();
  }

  // Fetch the token from storage then navigate to our appropriate place
  defineInitialScreen = async () => {
    const userId = await AsyncStorage.getItem('userId');//get('userToken');
    console.log(userId)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userId ? 'App' : 'Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator(
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
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1438A6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontSize: 25
      },
    }
  }
);

const App = createAppContainer(AppNavigator);

const SwitchNavigator = createSwitchNavigator(
  {
    Start: InitialScreen,
    App: App,
    Login: Login,
  },
  {
    initialRouteName: 'Start',
  }
);

export const AppContainer = createAppContainer(SwitchNavigator);