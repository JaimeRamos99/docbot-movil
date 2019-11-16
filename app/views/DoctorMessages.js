import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Left, Right, Toast, Input, Card, Root, CardItem, Body, Fab } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Profile } from './Profile.js';
import { Chat } from './Chat.js';
import { GetMessagesD } from '../services/api.js';
import { connect } from 'react-redux';


class DoctorMessages extends React.Component {
  /*static navigationOptions = {
		drawerIcon: () => <Icon name='email' type='material' color='#000' />
  }*/

  static navigationOptions = {
    title: 'Mensajes de doctor',
  };

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
                      <View key={'Paraclinical ' + index} style={{
                        marginTop: 5,
                        marginBottom: 5,
                        padding: 10,
                        backgroundColor: "#fff",
                        width: Dimensions.get('window').width*0.95,
                        borderColor: '#000',
                        borderWidth: 1,
                        borderRadius: 10, }}
                    >
                      <View style={{flexDirection: 'row'}}>
                        <Image source={require('../resources/avatar-doctor.png')} style={{ height: 60, width: 60, alignSelf: 'center', borderRadius: 360 }} />
                        <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 20 }}>Dr. {item.doctorName}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon name='md-time' type='ionicon' color='#000' size={15} />
                        <Text style={{ fontSize: 15, marginLeft: 5, color: '#000' }}>{item.date}</Text>
                      </View>
                      <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 20, color: '#1438A6' }}>{item.subject}</Text>
                      <Text style={{ flex: 1, flexWrap: 'wrap', marginBottom: 10 }}>{item.description}</Text>
                    </View>
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
          <View style={{ height: '100%', backgroundColor: '#f4f6f8', alignItems: 'center' }}>
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



<Card key={'Message ' + index}>
                        <View style={{flexDirection: 'row'}}>
                          <Image source={require('../resources/avatar-doctor.png')} style={{ marginLeft: 20, height: 60, width: 60, alignSelf: 'center', borderRadius: 360}} />
                          <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 20, marginLeft: 20, marginTop: 10 }}>Dr. {item.doctorName}</Text>
                        </View>
                        <Text style={{ flex: 1, flexWrap: 'wrap', marginLeft: 20, fontSize: 15 }}>{item.date}</Text>
                        <Text style={{ flex: 1, flexWrap: 'wrap', marginLeft: 20, fontSize: 20, color: '#1438A6' }}>{item.subject}</Text>
                        <Text style={{ flex: 1, flexWrap: 'wrap', marginLeft: 20, marginBottom: 10 }}>{item.description}</Text>
                      </Card>
*/