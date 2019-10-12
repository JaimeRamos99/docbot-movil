import React from 'react';
import { AsyncStorage, Dimensions, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { Button } from 'react-native-elements';
import { Card } from '../components/card.js';
import { CardSection } from '../components/cardsection.js';
import { Spinner } from '../components/Spinner.js';
import { signIn } from '../services/api.js';
import { Save, Get } from '../services/Persistant.js';
import { connect } from 'react-redux';

userGlobal = '';

class Login extends React.Component {
	state = { user: '', password: '', error: '', loading: false };

	onLoginFail() {
		this.setState({
			error: '*Usuario o contraseña incorrecta.',
			loading: false
		});
	}

	onButtonPress() {
		this.setState({ error: ''});		
		//this.props.navigation.navigate('Main');
		signIn("123456789","123456789")
		  .then(response => {
			return response.json();
		  })
		  .then(json => {
			  console.log(json);
			if (json.login == true) {
				/*Save('userId', json.id);
				Save('userName', json.name);
				Save('userLastName', json.lastName);
				Save('userMedicalCenter', json.medicalCenter);
				Save('userSex', json.sex);
				Save('userDocumentType', json.documentType);
				Save('userDocumentNumber', json.documentNumber);
				Save('userHeight', json.height);
				Save('userWeight', json.weight);
				Save('userBirthday', json.birthday);*/
				userGlobal = json;
				this.props.saveUser();
				this.props.navigation.navigate('Main');
			} else {
				console.log("NO FUNCIONÓ :'C");
				this.setState({ error: 'Usuario o contraseña incorrecto', loading: false });
			}
		  })
		  .catch(error => {
			console.log(error.message);
		  });
	}

  render(){
    return(
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={-64}
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
  				    <Image source={require('../resources/logo.png')} style={{ flex: 1,resizeMode: 'contain'}}/>
  				</View>
        </CardSection>
  			<CardSection>
  				<View style={{
  					height: 250,
  					flex: 1,
  					flexDirection: 'column',
  					justifyContent: 'space-around',
  					alignItems: 'center',
  				}}>
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
					
					<TouchableOpacity
					style={{alignContent: 'center', alignItems: 'center', backgroundColor: "#545aa1", borderRadius: 25, marginTop: 20, width: '60%'}} onPress={ this.onButtonPress.bind(this)}
					 >
						 <Text style={{color:'#fff', fontSize: 20, margin: 10}}>Ingresar</Text>
					 </TouchableOpacity>
  				</View>
  			</CardSection>
			</Card >
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
	button:{
		backgroundColor: "blueviolet",
		width: Dimensions.get('window').width*0.8,
		height: 40,
		borderColor: 'blueviolet',
		borderWidth: 5,
		borderRadius: 25,
		alignItems: 'center'
	},
	buttonText:{
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	}
});

function mapStateToProps(state){
	return{
		loggedInUser: state.loggedInUser
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveUser : () => dispatch({type:'Save_User', payload: userGlobal})
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