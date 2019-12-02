import React from 'react';
import { ActivityIndicator, AsyncStorage, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Left, Right, Toast, Input, Card, Root, CardItem, Body, Fab } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { save, get, deleteAll } from '../services/Persistant.js';
import { CardSection } from '../components/cardsection.js';
import { signIn, GetPatient, GetGoals, GetParaclinicals, GetMessagesD, getLego, updateLoggedUser } from '../services/api.js';
import moment from 'moment';

userId = '';

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    loading: false
  }

  componentWillMount(){
    this.loadInformation();
  }

  loadInformation = async ()=>{
    userId = await AsyncStorage.getItem('userId');
    console.log(userId)
    GetPatient(userId)
    .then(response => {
      return response.json();
    })
    .then(json => {
      user = json;
      this.props.saveUser(user);
      console.log(user);
      this.CorrectGoals(userId);
    }).catch(error => {
      console.log(error.message);
      this.ServerError();
    });
  }

  CorrectGoals(userId){
		GetGoals(userId)
			.then(response => {
				return response.json();
			})
			.then(json => {
				goals = json;
				date = moment().format('DD/MM/YYYY');
				for(let i = 0; i < goals.length; i++){
					if(goals[i].state == '2' && date > goals[i].dueDate){
						UpdateGoal(goals[i]._id, goals[i].progress, '0', goals[i].nMessages, goals[i].complianceDate);
					}
				}
			}).catch(error => {
				console.log(error.message);
				this.ServerError();
			});
	}

  RenderView(){
    if(this.state.loading){
      return(
        <View style={{ height: '100%', alignItems: 'center', backgroundColor: '#f4f6f8' }}>
          <Image source={require('../resources/logoT.png')} style={{ alignSelf: 'center', width: '80%', height: '20%', marginTop: 20 }} />
          <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#1438A6" />
          </View>
        </View>
      );
    }else{
      return(
        <View style={{ height: '100%', alignItems: 'center', backgroundColor: '#f4f6f8' }}>
          <Image source={require('../resources/logoT.png')} style={{ alignSelf: 'center', width: '80%', height: '20%', marginTop: 20 }} />
            <View style={{ flexDirection: 'row' , justifyContent: 'center' }}>
              <TouchableOpacity style={styles.menuButton} onPress={() =>  this.DocBot()}>
                <Icon name='md-chatboxes' type='ionicon' color='#f4f6f8' size={40} />
                <Text style={styles.buttonText} >Chat con DocBot</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuButton} onPress={() => this.Mensajes()}>
                <Icon name='email' type='material' color='#f4f6f8' size={40} />
                <Text style={styles.buttonText} >Mensajes de su doctor</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' , justifyContent: 'center' }}>
              <TouchableOpacity style={styles.menuButton} onPress={() => this.props.navigation.navigate('Perfil')}>
                <Icon name='md-person' type='ionicon' color='#f4f6f8' size={40} />
                <Text style={styles.buttonText} >Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuButton} onPress={() => this.Metas()}>
                <Icon name='md-trophy' type='ionicon' color='#f4f6f8' size={40} />
                <Text style={styles.buttonText} >Metas</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' , justifyContent: 'center' }}>
              <TouchableOpacity style={styles.menuButton} onPress={() => this.Paraclinicos()}>
                <Icon name='md-clipboard' type='ionicon' color='#f4f6f8' size={40} />
                <Text style={styles.buttonText} >Toma de glucosa</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuButton} onPress={() => this.props.navigation.navigate('Contador')}>
                <Icon name='md-walk' type='ionicon' color='#f4f6f8' size={40} />
                <Text style={styles.buttonText} >Contador de pasos</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logOutButton} onPress={() => this.signOut()}>
                <Text style={styles.buttonText}> Cerrar sesión</Text>
              </TouchableOpacity>
        </View>
      );
    }
  }

  ServerError(){
    this.setState({ loading: false })
    ToastAndroid.show('Fallo en conexión con el servidor', ToastAndroid.SHORT);
  }

  DocBot(){
    this.setState({ loading: true });
    getLego(userId)
      .then(response => {
        return response.json();
      })
      .then(json => {
        botMessages = json;
        console.log(botMessages);
        this.props.saveBotMessages();
        GetGoals(userId)
          .then(response => {
            return response.json();
          })
          .then(json => {
            goals = json;
            console.log(goals);
            this.props.saveGoals();
            this.setState({ loading: false });
            this.props.navigation.navigate('DocBot');
          }).catch(error => {
            console.log(error.message);
            this.ServerError();
          });
      }).catch(error => {
        console.log(error.message);
        this.ServerError();
      });
    
  }

  Mensajes(){
    this.setState({ loading: true });
    GetMessagesD(userId)
				.then(response => {
					return response.json();
				})
				.then(json => {
					doctorMessages = json;
					console.log(doctorMessages);
          this.props.saveDoctorMessages();
          this.setState({ loading: false });
          this.props.navigation.navigate('Mensajes')
				}).catch(error => {
          console.log(error.message);
          this.ServerError();
				});
  }

  Paraclinicos(){
    this.setState({ loading: true });
    GetParaclinicals(userId, 'Glucosa')
				.then(response => {
					return response.json();
				})
				.then(json => {
					paraclinicals = json;
					console.log(new Date());
					console.log(paraclinicals);
          this.props.saveParaclinicals();
          this.setState({ loading: false });
          this.props.navigation.navigate('Paraclinicos')
				}).catch(error => {
          console.log(error.message);
          this.ServerError();
				});
  }

  Metas(){
    this.setState({ loading: true });
    GetGoals(userId)
				.then(response => {
					return response.json();
				})
				.then(json => {
					goals = json;
					console.log(goals);
          this.props.saveGoals();
          this.setState({ loading: false });
          this.props.navigation.navigate('Metas')
				}).catch(error => {
          console.log(error.message);
          this.ServerError();
				});
  }

  signOut = async() =>{
    await AsyncStorage.clear();
    updateLoggedUser(user.id, false);
    this.props.navigation.navigate('Login')
  }

  render() {
      return (
          <View>
            {this.RenderView()}
          </View>
      );
  }
}

const styles = StyleSheet.create({
	menuButton:{
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#1438A6",
    height: Dimensions.get('window').height*0.2,
		width: '40%',
		borderColor: '#1438A6',
		borderWidth: 1,
		borderRadius: 10,
  },
  logOutButton:{
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#1438A6",
    height: Dimensions.get('window').height*0.05,
		width: '85%',
		borderColor: '#1438A6',
		borderWidth: 1,
		borderRadius: 25,
  },
	buttonText:{
    flexWrap: 'wrap',
    textAlign: 'center',
		color: '#f4f6f8',
		fontSize: 15,
		margin: 5
	}//{color:'#fff', fontSize: 20, margin: 10}
});

function mapStateToProps(state){
	return{
    loggedInUser: state.loggedInUser,
    doctorMessages: state.doctorMessages
	}
}

function mapDispatchToProps(dispatch){
	return{
    saveUser : (user) => dispatch({type:'Save_User', payload: user}),
		saveGoals : () => dispatch({type:'save_goals', payload: goals}),
		saveParaclinicals : () => dispatch({type:'save_paraclinicals', payload: paraclinicals}),
		saveDoctorMessages : () => dispatch({type:'save_doctor_messages', payload: doctorMessages}),
		saveBotMessages : () => dispatch({type:'save_bot_Messages', payload: botMessages}),
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