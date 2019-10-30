import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Left, Right, Toast, Input, Card, Root, CardItem, Body, Fab } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Profile } from './Profile.js';
import { Chat } from './Chat.js';
import { connect } from 'react-redux';


class DoctorMessages extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-home' type='ionicon' color='#000' />
  }
  
  ShowDoctorMessages(){
    if(this.props.doctorMessages.length == 0){
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>
            No existen mensajes
          </Text>
        </View>
        );
    }else{
        return(
            <ScrollView>
                { this.props.doctorMessages.map((item, index) => (
                    <Card key={'Message ' + index}>
                    <CardItem header>
                      <Image source={require('../resources/avatar-doctor.png')} style={{ height: 60, width: 60, alignSelf: 'center', borderRadius: 360}} />
                      <Text style={{fontSize: 20, marginLeft: 20}}>Dr. {item.doctorName}</Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text style={{fontSize: 20}}>{item.subject}</Text>
                        <Text>{item.description}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                ))}
            </ScrollView>
        );
    }
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
                  onPress={() => this.props.navigation.openDrawer()}/>
              }
              centerComponent={{ text: 'Inicio', style: { color: '#fff' } }}
              containerStyle={{
                backgroundColor: '#1438A6',
              }}
            />
              {this.ShowDoctorMessages()}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMessages);

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