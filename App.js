import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContainer } from './app/components/Navigation.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  loggedInUser: '', goals: [], paraclinicals: [], doctorMessages: [], botMessages: []
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

    case 'save_doctor_messages':
      state.doctorMessages = action.payload;
      break;

    case 'save_bot_Messages':
      state.botMessages = action.payload;
      break;
  }
  return state;
};

const store = createStore(reducer);

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
