import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Left, Right, Toast, Input, Card, Root, CardItem, Body, Fab } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { connect } from 'react-redux';


class Home extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-home' type='ionicon' color='#000' />
  }

  render() {
      return (
          <View style={{ height: '100%' }}>
            <Header
              placement='left'
              leftComponent={
                <Icon 
                  name='md-menu' 
                  type='ionicon' 
                  color='#fff' 
                  size={30}
                  onPress={() => this.props.navigation.openDrawer()}/>
              }
              centerComponent={{ text: 'Inicio', style: { color: '#fff', fontSize: 25 } }}
              containerStyle={{
                backgroundColor: '#1438A6',
              }}
            />
            <ImageBackground style={{ flex: 1 }} source={require('../resources/logo.jpg')}>
              
            </ImageBackground>
          </View>
      );
  }
}

function mapStateToProps(state){
	return{
    loggedInUser: state.loggedInUser,
    doctorMessages: state.doctorMessages
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveUser : () => dispatch({type:'Save_User', payload: userGlobal})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**/

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

export const Drawer = createAppContainer(MyDrawerNavigator);


<Fab
              style={{ backgroundColor: '#1438A6' }}
            >
              <Icon
                  reverse
                  name='md-chatboxes'
                  type='ionicon'
                  color='#1438A6'
              />
            </Fab>

*/