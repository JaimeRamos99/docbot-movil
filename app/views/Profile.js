import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Left, Right, Toast, Input, Card, Root, CardItem } from 'native-base';
import { Button, Header, Icon } from 'react-native-elements';
import { CardSection } from '../components/cardsection';
import { Hoshi } from 'react-native-textinput-effects';
import { connect } from 'react-redux';

class Profile extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-person' type='ionicon' color='#000' />
  }

  state = {
      nombre: this.props.loggedInUser.name + ' ' + this.props.loggedInUser.lastName,
      edad: this.props.loggedInUser.age,
      peso: this.props.loggedInUser.weight,
      estatura: this.props.loggedInUser.height,
      metas: [],
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
      editmode: false,
    }

    editUser() {
    Toast.show({
      text: "Editado correctamente",
      textStyle: { color: "green", fontFamily: "Roboto" },
      buttonText: "Ok",
      duration: 3000
    })


  }

    userInfo() {
    if (this.state.editmode === true) {
      return (
        <ScrollView style={{ height: '100%', paddingBottom: 30, marginBottom: 20 }}>
          <Hoshi value={this.state.nombre} borderColor={'#000000'} label={'Nombre'} onChangeText={nombre => this.setState({ nombre })} />
          <Hoshi value={this.state.edad} borderColor={'#000000'} keyboardType='numeric' label={'Edad'} onChangeText={edad => this.setState({ edad })} />
          <Hoshi value={this.state.estatura} borderColor={'#000000'} keyboardType='numeric' label={'Estatura'} onChangeText={estatura => this.setState({ estatura })} />
          <Hoshi value={this.state.peso} borderColor={'#000000'} keyboardType='numeric' label={'Peso'} onChangeText={peso => this.setState({ peso })} />
          <Button
            rounded
            title="Guardar"
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#00AA00",
              width: '100%'
            }} />
          <Button
            rounded
            title="Cancelar"
            onPress={() => { this.setState({ editmode: false }) }}
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#545aa1",
              width: '100%'
            }} />
        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={{ height: '100%', paddingBottom: 30, marginBottom: 20 }}>
          <Card>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Nombre </Text><Text style={{ fontSize: 16 }}> {this.state.nombre}</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Edad </Text><Text style={{ fontSize: 16 }}> {this.state.edad} años</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Estatura </Text><Text style={{ fontSize: 16 }}>{this.state.estatura} metros</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Peso </Text><Text style={{ fontSize: 16 }}>{this.state.peso} kg</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Pasos </Text><Text style={{ fontSize: 16 }}> {this.state.currentStepCount} pasos</Text>
            </CardItem>
          </Card>
          <Button
            rounded
            title="Editar Perfil"
            onPress={() => { this.setState({ editmode: true }) }}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 25,
              backgroundColor: "#545aa1",
              width: '100%',
            }} />
        </ScrollView>
      )
    }
  }

  render(){
    return(
        <View>
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
          <ImageBackground style={{ width: '100%', height: 150 }} source={require('../resources/background.jpg')}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../resources/avatar.png')} style={{ height: 120, width: 120, borderRadius: 60 }}></Image>
            </View>
          </ImageBackground>

            <CardSection>
              {this.userInfo()}
            </CardSection>
        </View>
    );
  }
}

function mapStateToProps(state){
	return{
		loggedInUser: state.loggedInUser
	}
}

export default connect(mapStateToProps)(Profile);