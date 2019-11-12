import React from 'react';
import { ActivityIndicator, AsyncStorage, Dimensions, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, WebView } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { Button } from 'react-native-elements';
import { Card } from '../components/card.js';
import { CardSection } from '../components/cardsection.js';
import { Spinner } from '../components/Spinner.js';
import { signIn, GetGoals, GetParaclinicals, GetMessagesD, getLego } from '../services/api.js';
import { Save, Get } from '../services/Persistant.js';
import { connect } from 'react-redux';

userGlobal = '';
goals = [];
paraclinicals = [];
doctorMessages = [];
botMessages = [];

class Login extends React.Component {
	state = { user: '', password: '', error: '', loading: false };

	onLoginFail() {
		this.setState({
			error: '*Usuario o contraseña incorrecta.',
			loading: false
		});
	}

	renderButton(){
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
		signIn('368', '368')
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
				userGlobal = json;
				if (userGlobal.avatar == '') {
					if (userGlobal.sex == 'f') {
						userGlobal.avatar = 'Avatar-F-T-N.png';
					}else{
						userGlobal.avatar = 'Avatar-M-T-N.png';
					}
				}
				console.log(userGlobal);
				this.props.saveUser();
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
				this.setState({ loading: false});
				this.props.navigation.navigate('App');
			} else {
				this.onLoginFail();
			}
		  })
		  .catch(error => {
			console.log(error.message);
			this.setState({ error: 'Fallo en conexión con el servidor', loading: false })
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
					{this.renderButton()}
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