import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Left, Right, Icon, Toast, Input, Card, Root, CardItem, Body } from 'native-base';
import { Header } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Profile } from './Profile.js';
import { Chat } from './Chat.js';


export class Home extends React.Component {
  onButtonPress() {
		this.props.navigation.navigate('Profile');
	}

  render() {
      return (
          <View style={{ height: '100%' }}>
            <Card>
              <CardItem header>
                <Image source={require('../resources/avatar-doctor.png')} style={{ height: 40, width: 40, alignSelf: 'center'}} />
                <Text>Recordatorio</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Recuerda que debes comer las raciones asignadas para que mejore tu salud</Text>
                </Body>
              </CardItem>
            </Card>
          </View>
      );
  }
}

/*<Header
              placement='left'
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Inicio', style: { color: '#fff' } }}
              containerStyle={{
                backgroundColor: '#1438A6',
              }}
            /> */
/*const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    Chat: Chat,
    Profile: Profile
  },
  {
    initialRouteName: 'Home',
  }
);

export const Drawer = createAppContainer(MyDrawerNavigator);*/