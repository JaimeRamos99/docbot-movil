import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import  Login  from './app/views/Login.js';
import { Home } from './app/views/Home.js';
import { Profile } from './app/views/Profile.js';
import { Chat } from './app/views/Chat.js';
import Main from './app/Main.js';
import { StepCount } from './app/views/StepCount.js';
import { Goals } from './app/views/Goals.js';
import { ClinicalHistory } from './app/views/ClinicalHistory.js';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  loggedInUser: '', goals: [], paraclinicals: [], doctorMessages: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'Save_User':
      state.loggedInUser = action.payload;
      break;

    case 'save_goals':
        state.goals = action.payload;
        break;

    case 'save_paraclinicals':
      state.paraclinicals = action.payload;
      break;

    case 'save_doctorMessages':
      state.doctorMessages = action.payload;
      break;
  }
  return state;
};

const store = createStore(reducer);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Main: Main,
    Auth: Login,
  },
  {
    initialRouteName: 'Auth',
  }
));

const AppNavigator = createStackNavigator({Login: Login});

//const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return (
      /*<View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>*/
      //<Chat  />
      <Provider store={store}>
        <AppContainer />
      </Provider>
      //<StepCount />
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
