import React from 'react';
import { ActivityIndicator, AsyncStorage, Dimensions, View, Text, Image, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, KeyboardAvoidingView, WebView } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { Button } from 'react-native-elements';
import { Card } from '../components/card.js';
import { CardSection } from '../components/cardsection.js';
import { Spinner } from '../components/Spinner.js';
import { signIn, updateLoggedUser, GetPatient, GetGoals, GetParaclinicals, GetMessagesD, getLego, UpdateGoal } from '../services/api.js';
import { save, get } from '../services/Persistant.js';
import { registerForPushNotificationsAsync } from '../services/Notifications.js';
import { connect } from 'react-redux';
import moment from 'moment';

userGlobal = '';
goals = [];
paraclinicals = [];
doctorMessages = [];
botMessages = [];

class Login extends React.Component {
	state = { user: '', password: '', error: '', loading: false };

	OnLoginFail() {
		this.setState({
			error: '*Usuario o contraseña incorrecta.',
			loading: false
		});
	}

	ServerError(){
		this.setState({ loading: false })
		ToastAndroid.show('Fallo en conexión con el servidor', ToastAndroid.SHORT);
	  }

	RenderButton(){
		if (!this.state.loading){
			return(
				<TouchableOpacity
					style={styles.button} onPress={ this.onButtonPress.bind(this)}
				>
					<Text style={styles.buttonText}>Ingresar</Text>
				</TouchableOpacity>
			);
		}else{
			return(
				<View styles={{marginTop: 20, alignItems: 'center'}}>
					<ActivityIndicator size="large" color="#1438A6" />
				</View>
			);
		}
	}

	

	 onButtonPress() {
		this.setState({ error: '', loading: true});
		signIn('12486375', '12486375')//12486375 - 1042459222
		  .then(response => {
			return response.json();
		  })
		  .then(json => {
			if (json.login == true) {
				//Save('userId', json.id);
				//Save('userName', json.name);
				//Save('userLastName', json.lastName);
				//Save('userMedicalCenter', json.medicalCenter);
				//Save('userSex', json.sex);
				//Save('userDocumentType', json.documentType);
				//Save('userDocumentNumber', json.documentNumber);
				//Save('userHeight', json.height);
				//Save('userWeight', json.weight);
				//Save('userBirthday', json.birthday);
				user = json;
				console.log(user);
				AsyncStorage.setItem('userId', user.id);
				GetPatient(user.id)
				.then(response => {
					return response.json();
				})
				.then(json => {
					user = json;
					this.props.saveUser(user);
					console.log(user);
					updateLoggedUser(user.id, true);
				}).catch(error => {
					console.log(error.message);
					this.ServerError();
				});
				//registerForPushNotificationsAsync(userGlobal.id);
				/*getLego(userGlobal.id)
				.then(response => {
					return response.json();
				})
				.then(json => {
					botMessages = json;
					console.log(botMessages);
					this.props.saveBotMessages();
				}).catch(error => {
					console.log(error.message);
				});*/
				/*GetMessagesD(userGlobal.id)
				.then(response => {
					return response.json();
				})
				.then(json => {
					doctorMessages = json;
					console.log(doctorMessages);
					this.props.saveDoctorMessages();
				}).catch(error => {
					console.log(error.message);
				});*/
				/*GetGoals(userGlobal.id)
				.then(response => {
					return response.json();
				})
				.then(json => {
					goals = json;
					console.log(goals);
					this.props.saveGoals();
				}).catch(error => {
					console.log(error.message);
				});*/
				/*GetParaclinicals(userGlobal.id, 'Glucosa')
				.then(response => {
					return response.json();
				})
				.then(json => {
					paraclinicals = json;
					console.log(new Date());
					console.log(paraclinicals);
					this.props.saveParaclinicals();
				}).catch(error => {
					console.log(error.message);
				});*/
				this.props.navigation.navigate('App');
				//this.CorrectGoals();
			} else {
				this.OnLoginFail();
			}
		  })
		  .catch(error => {
			console.log(error.message);
			this.ServerError();
		  });
	}

  render(){
    return(
      <KeyboardAvoidingView
        behavior='padding'
      >
      	<Card>
			<CardSection>
				<View style={{
					height: 200,
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',
						marginTop: 20
				}}
				>
					<Image source={require('../resources/logo.jpg')} style={{ flex: 1,resizeMode: 'contain'}} />
				</View>
			</CardSection>
			<CardSection>
				<View style={{
					height: 250,
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',}}
				>
					<Text style={{ color: 'red', fontSize: 16 }}>{this.state.error}</Text>
					<Hoshi
						value={this.state.user}
						onChangeText={user => this.setState({ user })}
						label={'Usuario'}
						style={{ width: 300 }}
						borderColor={'#000000'}
					/>
					<Hoshi
						secureTextEntry
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						label={'Contraseña'}
						style={{ width: 300 }}
						borderColor={'#000000'}
					/>
					{this.RenderButton()}
				</View>
			</CardSection>
		</Card >
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
	button:{
		alignItems: 'center',
		marginTop: 20,
		backgroundColor: "#1438A6",
		width: Dimensions.get('window').width*0.5,
		borderColor: '#1438A6',
		borderWidth: 5,
		borderRadius: 25,
		
	},
	buttonText:{
		color: '#fff',
		fontSize: 25,
		margin: 5
	}//{color:'#fff', fontSize: 20, margin: 10}
});

function mapStateToProps(state){
	return{
		loggedInUser: state.loggedInUser
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveUser : () => dispatch({type:'Save_User', payload: userGlobal}),
		saveGoals : () => dispatch({type:'save_goals', payload: goals}),
		saveParaclinicals : () => dispatch({type:'save_paraclinicals', payload: paraclinicals}),
		saveDoctorMessages : () => dispatch({type:'save_doctor_messages', payload: doctorMessages}),
		saveBotMessages : () => dispatch({type:'save_bot_Messages', payload: botMessages}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
/*<Button
						rounded
						title="Ingresar"
						onPress={ this.onButtonPress.bind(this)}
						buttonStyle={{
							marginTop: 20,
							borderRadius: 25,
							backgroundColor: "#545aa1",
							width: '100%',
						}}
						titleStyle={{
							alignItems: 'center'
						}}
						containerStyle={{
							justifyContent: 'center'
						}}
					/>*/