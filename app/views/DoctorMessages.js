import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Left, Right, Toast, Input, Card, Root, CardItem, Body, Fab } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Profile } from './Profile.js';
import { Chat } from './Chat.js';
import { GetMessagesD } from '../services/api.js';
import { connect } from 'react-redux';


class DoctorMessages extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='email' type='material' color='#000' />
  }
  state = {
      messages: this.props.doctorMessages
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
                    { this.state.messages.map((item, index) => (
                        <Card key={'Message ' + index}>
                          <View style={{flexDirection: 'row'}}>
                            <Image source={require('../resources/avatar-doctor.png')} style={{ marginLeft: 20, height: 60, width: 60, alignSelf: 'center', borderRadius: 360}} />
                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 20, marginLeft: 20, marginTop: 10 }}>Dr. {item.doctorName}</Text>
                          </View>
                          <Text style={{ flex: 1, flexWrap: 'wrap', marginLeft: 20, fontSize: 20, color: '#1438A6' }}>{item.subject}</Text>
                          <Text style={{ flex: 1, flexWrap: 'wrap', marginLeft: 20, marginBottom: 10 }}>{item.description}</Text>
                    </Card>
                    ))}
                </ScrollView>
            );
        }
    }

    GetMessages(){
        console.log('se ejecuta')
        GetMessagesD(this.props.loggedInUser.id)
				.then(response => {
					return response.json();
				})
				.then(json => {
					this.setState({ messages: json});
					console.log(doctorMessages);
				}).catch(error => {
					console.log(error.message);
				});
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
              centerComponent={{ text: 'Mensajes del doctor', style: { color: '#fff', fontSize: 25 } }}
              containerStyle={{
                backgroundColor: '#1438A6',
              }}
            />
            {this.ShowDoctorMessages()}
            <Fab
              style={{ backgroundColor: '#1438A6' }}
              onPress={this.GetMessages.bind(this)}
            >
              <Icon
                  reverse
                  name='md-sync'
                  type='ionicon'
                  color='#1438A6'
              />
            </Fab>
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




*/